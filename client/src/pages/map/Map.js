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
const axios = require('axios');

class Map extends Component {

  constructor(props){
    super(props);
    this.state = {
        displayCreateCrime: false
    };

  // this.closeCrimeDialog = this.closeCrimeDialog.bind(this)
  }

  onDispatcherClick=(obj)=>{
    this.setState({
      displayCreateCrime: true,
      crimeLat: obj.lat,
      crimeLng: obj.lng
     })
    console.log(obj.lng)
  }

  onEmergencyButtonClick=()=>{
    // Create crime on current location
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
  }

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
  geoError(){
    console.log("Error")
    toast(`You have denied location permissions, this must be changed manually in your browser settings.`,{
      type: toast.TYPE.ERROR,
      position: toast.POSITION.TOP_CENTER
    });
  }

 

  closeCrimeDialog=()=>{
    this.setState({displayCreateCrime:false})
  }

  render(){



    // GARDA ONLY

    if(localStorage.getItem('user_staffType') == "garda"){


        return (
        
        <div id="mapPageContainer">
        <Route path="/map" exact component={SideNav}/>
        <div className="row header">
          <div className="col s2"><a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a></div>
          <div className="col s8"><span className="username">{localStorage.getItem('user_rank')}. {localStorage.getItem('user_name')}</span><br/><span className="unitname">{ localStorage.getItem('user_badgeNumber') != "null" && localStorage.getItem('user_badgeNumber')}</span></div>
          <div className="col s2"><a className="btn-floating btn-small waves-effect waves-light red"><i className="material-icons">close</i></a><br/><span className="buttonLabel">Busy</span></div>
        </div>
          <div id="GoogleMap">
            <GoogleMap staffType={"garda"}/>
          </div>
            <div className="row footer">
                  <div className="col s4"><a  onClick={()=>this.onEmergencyButtonClick()} className="btn-floating btn-large waves-effect waves-light blue"><img src="/images/danger.svg" className="btn-icon"/></a><br/><span className="buttonLabel">Emergency</span></div>
                  <div className="col s4"><a className="btn-floating btn-large waves-effect waves-light blue"><img src="/images/siren.png" className="btn-icon"/></a><br/><span className="buttonLabel">Pursuit</span></div>
                  <div className="col s4"><a className="btn-floating btn-large waves-effect waves-light blue"><img src="/images/notes.png" className="btn-icon"/></a><br/><span className="buttonLabel">Report</span></div>
              <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.js"></script>
            </div>
        </div>

      );




   
    }

    // DISPATCHER ONLY
    else if(localStorage.getItem('user_staffType') == "dispatcher"){
     return(
      <div id="mapPageContainer">
        <Route path="/map" exact component={SideNav}/>
        <div className="row header">
          <div className="col s2"><a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a></div>
          <div className="col s8"><span className="username">{localStorage.getItem('user_rank')}. {localStorage.getItem('user_name')}</span><br/><span className="unitname">{ localStorage.getItem('user_badgeNumber') != "null" && localStorage.getItem('user_badgeNumber')}</span></div>
          <div className="col s2"><a className="btn-floating btn-small waves-effect waves-light green"><i className="material-icons">check</i></a><br/><span className="buttonLabel">On shift</span></div>
        </div>
          <div id="GoogleMap">

          <GoogleMap  onClick={this.onDispatcherClick} staffType={"dispatcher"} />

        <div className="createCrimeContainer">
        
        {this.state.displayCreateCrime ? <CreateCrime display={this.state.displayCreateCrime} closeCrimeDialog={this.closeCrimeDialog} crimeLat={this.state.crimeLat} crimeLng={this.state.crimeLng}/> : <div></div>}
              
        </div>              


          </div>
            <div className="row footer">
                  {/* <div className="col s4"><a className="btn-floating btn-large waves-effect waves-light blue"><img src="/images/danger.svg" className="btn-icon"/></a><br/><span className="buttonLabel">Emergency</span></div>
                  <div className="col s4"><a className="btn-floating btn-large waves-effect waves-light blue"><img src="/images/siren.png" className="btn-icon"/></a><br/><span className="buttonLabel">Pursuit</span></div>
                  <div className="col s4"><a className="btn-floating btn-large waves-effect waves-light blue"><img src="/images/notes.png" className="btn-icon"/></a><br/><span className="buttonLabel">Report</span></div> */}
              <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.js"></script>
            </div>
      </div>

     )
   }
  }
}

export default Map;
