import React from 'react';
import './Login.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";

function Login() {
  return (

    <div className="Login valign-wrapper">

      <div className ="col l3"></div>
      <div className="container col s6">
        <div className="loginBox">
          <h1>Login</h1>

          <div className="row">
            <div className="input-field">
              <input id="emailField" type="email" className="validate"/>
              <label className="active" for="emailField">Garda Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field">
              <input id="passwordField" type="password" className="validate"/>
              <label className="active" for="passwordField">Garda Password</label>
            </div>
          </div>
          <Link to="/map">
            <button className="btn">Login</button>
          </Link>
        </div>
      </div>
      <div className ="col l3"></div>

      
       <div className="background">
         <img src="/images/gardaBackground.jpg"  alt="background"/>
       </div>
    </div>
  );
}

export default Login;
