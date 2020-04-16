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

import GoogleMap from '../../components/GoogleMap';
import SideNav from "../../components/SideNav";
import CreateCrime from '../../components/CreateCrime';

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
                  <div className="col s4"><a className="btn-floating btn-large waves-effect waves-light blue"><img src="/images/danger.svg" className="btn-icon"/></a><br/><span className="buttonLabel">Emergency</span></div>
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
                  <div className="col s4"><a className="btn-floating btn-large waves-effect waves-light blue"><img src="/images/danger.svg" className="btn-icon"/></a><br/><span className="buttonLabel">Emergency</span></div>
                  <div className="col s4"><a className="btn-floating btn-large waves-effect waves-light blue"><img src="/images/siren.png" className="btn-icon"/></a><br/><span className="buttonLabel">Pursuit</span></div>
                  <div className="col s4"><a className="btn-floating btn-large waves-effect waves-light blue"><img src="/images/notes.png" className="btn-icon"/></a><br/><span className="buttonLabel">Report</span></div>
              <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.js"></script>
            </div>
      </div>

     )
   }
  }
}

export default Map;
