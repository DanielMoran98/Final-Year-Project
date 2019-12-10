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
  <div id="GoogleMap">
    <GoogleMap/>
  </div>
</div>

);
}

export default Map;
