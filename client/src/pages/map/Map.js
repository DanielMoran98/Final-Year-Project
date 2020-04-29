import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './Map.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GoogleMap from '../../components/GoogleMap';
import SideNav from "../../components/SideNav";
import CreateCrime from '../../components/CreateCrime';
import CreateReport from '../../components/CreateReport';
import addNotification from 'react-push-notification';

const axios = require('axios');

class Map extends Component {

  constructor(props){
    super(props);
    this.state = {
        displayCreateCrime: false,
        displayCreateReport: false,
        activityState: "busy",
        userLng: 0.00,
        userLat: 0.00
    };

  // this.closeCrimeDialog = this.closeCrimeDialog.bind(this)
  }

  // Dispatcher click on map handler
  onDispatcherClick=(obj)=>{
    this.setState({
      displayCreateCrime: true,
      crimeLat: obj.lat,
      crimeLng: obj.lng
     })
    console.log(obj.lng)
  }

  onPursuitButtonClick=()=>{
    // Notify user
    toast(`The pursuit feature will be available in a later version.`,{
      type: toast.TYPE.INFO,
      position: toast.POSITION.TOP_CENTER,
    });  

  }

  onEmergencyButtonClick=()=>{
    // Create crime on current location
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
  }

    async requestUserLocation(){
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.requestUserLocationSuccess, this.requestUserLocationFailure);
      } else {
          alert("Geolocation is not supported by this browser.");
      }
    }
  
    // If user has accepted location permissions
    requestUserLocationSuccess=(position)=>{
      this.setState({userLng: position.coords.longitude, userLat: position.coords.latitude})
    }

    // If user has denied location permissions
    async requestUserLocationFailure(position){
      console.log("Failure")
    }

  // If user has accepted location permissions
  async geoSuccess(position){
    console.log("Success")
    console.log(position.coords.longitude)
    var formData = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      crimeType: "Distress Call",
      crimeDescription: "Garda in need of assistance",
      victimContact: localStorage.getItem("user_phone"),
      urgency: 4,
      dangers: "Unknown",
      suspectDescription: "Unknown",
      division_id: localStorage.getItem('user_division_id'),
      staff_id: localStorage.getItem('user_id')
  }

  console.log(formData)
  const response = await axios.post('/api/crime/create',formData , {headers: {'Authorization': "Bearer "+localStorage.getItem('jwtToken')}}).then(function(){
      console.log("done")
      toast(`Your emergency request has been sent to the Gardaí`,{
          type: toast.TYPE.SUCCESS,
          position: toast.POSITION.TOP_CENTER
      });


  }).catch(function(){
      toast(`Emergency failed to send, you may have denied location access to the application`,{
          type: toast.TYPE.ERROR,
          position: toast.POSITION.TOP_CENTER
      });
  })

  }

  // If user has rejected location permissions
  geoError(){
    console.log("Error")
    toast(`You have denied location permissions, this must be changed manually in your browser settings.`,{
      type: toast.TYPE.ERROR,
      position: toast.POSITION.TOP_CENTER
    });
  }

  onReportButtonClick=()=>{
    this.setState({displayCreateReport:true})
  }

  closeCrimeDialog=()=>{
    this.setState({displayCreateCrime:false})
  }
  closeReportDialog=()=>{
    this.setState({displayCreateReport:false})
  }

  toggleActivityState=()=>{
    if(this.state.activityState == "busy"){

      this.setState({activityState:"active"})
      var formData = {user_id: localStorage.getItem('user_id'), status: "active"}
      const response = axios.post('/api/staff/setstatus', formData , {headers: {'Authorization': "Bearer "+localStorage.getItem('jwtToken')}})

    }else if(this.state.activityState == "active"){

      this.setState({activityState:"busy"})
      var formData = {user_id: localStorage.getItem('user_id'), status: "busy"}
      const response = axios.post('/api/staff/setstatus', formData , {headers: {'Authorization': "Bearer "+localStorage.getItem('jwtToken')}})

    }
  }

  componentDidMount(){
    this.interval = setInterval(()=>this.requestUserLocation(), 1500);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  render(){

    // GARDA ONLY

    if(localStorage.getItem('user_staffType') == "garda"){


        return (
        
        <div id="mapPageContainer">

        <div className="row header">
          <div className="col s2"><a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a></div>
          <div className="col s8"><span className="username">{localStorage.getItem('user_rank')}. {localStorage.getItem('user_name')}</span><br/><span className="unitname">{ localStorage.getItem('user_badgeNumber') != "null" && localStorage.getItem('user_badgeNumber')}</span></div>
          {this.state.activityState == "busy" ?
            <div className="col s2"><a onClick={()=>this.toggleActivityState()} className="btn-floating btn-small waves-effect waves-light red"><i className="material-icons">close</i></a><br/><span className="buttonLabel">Busy</span></div>
          :
            <div className="col s2"><a onClick={()=>this.toggleActivityState()} className="btn-floating btn-small waves-effect waves-light green"><i className="material-icons">check</i></a><br/><span className="buttonLabel">Active</span></div>
          }



        </div>
          <div id="GoogleMap">
            <GoogleMap staffType={"garda"} activityState={this.state.activityState} userLat={this.state.userLat} userLng={this.state.userLng}/>

          </div>

          { this.state.displayCreateReport == true &&
          <div className="createReportDialog">
            <CreateReport closeReportDialog={this.closeReportDialog}/>
          </div>

        }
            <div className="row footer">
                  <div className="col s4"><a onClick={()=>this.onEmergencyButtonClick()} className="btn-floating btn-large waves-effect waves-light blue"><img src="/images/danger.svg" className="btn-icon"/></a><br/><span className="buttonLabel">Emergency</span></div>
                  <div className="col s4"><a onClick={()=>this.onPursuitButtonClick()} className="btn-floating btn-large waves-effect waves-light blue"><img src="/images/siren.png" className="btn-icon"/></a><br/><span className="buttonLabel">Pursuit</span></div>
                  <div className="col s4"><a onClick={()=>this.onReportButtonClick()}className="btn-floating btn-large waves-effect waves-light blue"><img src="/images/notes.png" className="btn-icon"/></a><br/><span className="buttonLabel">Report</span></div>

            </div>
            <SideNav staffType={"garda"}/>
            <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
             <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.js"></script>
        </div>

      );




   
    }

    // DISPATCHER ONLY
    else if(localStorage.getItem('user_staffType') == "dispatcher"){
     return(
      <div id="mapPageContainer">
        
        <div className="row header">
          <div className="col s2"><a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a></div>
          <div className="col s8"><span className="username">{localStorage.getItem('user_rank')}. {localStorage.getItem('user_name')}</span><br/><span className="unitname">{ localStorage.getItem('user_badgeNumber') != "null" && localStorage.getItem('user_badgeNumber')}</span></div>
          {this.state.activityState == "busy" ?
            <div className="col s2"><a onClick={()=>this.toggleActivityState()} className="btn-floating btn-small waves-effect waves-light red"><i className="material-icons">close</i></a><br/><span className="buttonLabel">Busy</span></div>
          :
            <div className="col s2"><a onClick={()=>this.toggleActivityState()} className="btn-floating btn-small waves-effect waves-light green"><i className="material-icons">check</i></a><br/><span className="buttonLabel">Active</span></div>
          }        </div>
          <div id="GoogleMap">

          <GoogleMap  onClick={this.onDispatcherClick} staffType={"dispatcher"} activityState={this.state.activityState}  userLat={this.state.userLat} userLng={this.state.userLng}/>

        <div className="createCrimeContainer">
        
        {this.state.displayCreateCrime ? <CreateCrime display={this.state.displayCreateCrime} closeCrimeDialog={this.closeCrimeDialog} crimeLat={this.state.crimeLat} crimeLng={this.state.crimeLng}/> : <div></div>}
              
        </div>              


          </div>
            <div className="row footer">
                  {/* <div className="col s4"><a className="btn-floating btn-large waves-effect waves-light blue"><img src="/images/danger.svg" className="btn-icon"/></a><br/><span className="buttonLabel">Emergency</span></div>
                  <div className="col s4"><a className="btn-floating btn-large waves-effect waves-light blue"><img src="/images/siren.png" className="btn-icon"/></a><br/><span className="buttonLabel">Pursuit</span></div>
                  <div className="col s4"><a className="btn-floating btn-large waves-effect waves-light blue"><img src="/images/notes.png" className="btn-icon"/></a><br/><span className="buttonLabel">Report</span></div> */}

            </div>
            <SideNav staffType={"dispatcher"}/>
            <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.js"></script>

      </div>

     )
   }
  }
}

export default Map;
