import React from 'react';
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


function Map() {
  return (

  <div id="mapPageContainer">
  <div className="row header">
    <div className="col s2"><a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a></div>
    <div className="col s8"><span className="username">Sgt. Daniel Moran</span><br/><span className="unitname">Unit DT-103</span></div>
    <div className="col s2"><a class="btn-floating btn-small waves-effect waves-light red"><i class="material-icons">close</i></a><br/><span className="buttonLabel">Busy</span></div>
  </div>
    <div id="GoogleMap">
      <GoogleMap/>
    </div>
      <div className="row footer">
        {/* <div className="col l3"></div>
          <div className="footercolumns col l6 "> */}
            <div className="col s4"><a class="btn-floating btn-large waves-effect waves-light blue"><img src="/images/danger.svg" class="btn-icon"/></a><br/><span className="buttonLabel">Emergency</span></div>
            <div className="col s4"><a class="btn-floating btn-large waves-effect waves-light blue"><img src="/images/siren.png" class="btn-icon"/></a><br/><span className="buttonLabel">Pursuit</span></div>
            <div className="col s4"><a class="btn-floating btn-large waves-effect waves-light blue"><img src="/images/notes.png" class="btn-icon"/></a><br/><span className="buttonLabel">Notes</span></div>
          {/* </div> */}
        {/* <div className="col l3"></div> */}
      </div>
  </div>

);
}

export default Map;
