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

class Map extends Component {


  render(){

      return (
      
      <div id="mapPageContainer">
      <Route path="/map" exact component={SideNav}/>
      <div className="row header">
        <div className="col s2"><a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a></div>
        <div className="col s8"><span className="username">Sgt. Daniel Moran</span><br/><span className="unitname">Unit DT-103</span></div>
        <div className="col s2"><a className="btn-floating btn-small waves-effect waves-light red"><i className="material-icons">close</i></a><br/><span className="buttonLabel">Busy</span></div>
      </div>
        <div id="GoogleMap">
          <GoogleMap/>
        </div>
          <div className="row footer">
            {/* <div className="col l3"></div>
              <div className="footercolumns col l6 "> */}
                <div className="col s4"><a className="btn-floating btn-large waves-effect waves-light blue"><img src="/images/danger.svg" className="btn-icon"/></a><br/><span className="buttonLabel">Emergency</span></div>
                <div className="col s4"><a className="btn-floating btn-large waves-effect waves-light blue"><img src="/images/siren.png" className="btn-icon"/></a><br/><span className="buttonLabel">Pursuit</span></div>
                <div className="col s4"><a className="btn-floating btn-large waves-effect waves-light blue"><img src="/images/notes.png" className="btn-icon"/></a><br/><span className="buttonLabel">Notes</span></div>
              {/* </div> */}
            {/* <div className="col l3"></div> */}
            <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.js"></script>
            {console.log("Importedd")}
          </div>
      </div>

    );
  }
}

export default Map;
