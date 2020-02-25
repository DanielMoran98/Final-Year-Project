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

    <div className="Login">
      <div className="container">
        <div className="row">
          <div className ="col m6 offset-m3 s10 offset-s1">
            <div className="loginBox">
              <h1>Login</h1>

              <div className="row">
                <div className="input-field">
                  <input id="emailField" type="email" className="validate"/>
                  <label className="active" htmlFor="emailField">Garda Email</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field">
                  <input id="passwordField" type="password" className="validate"/>
                  <label className="active" htmlFor="passwordField">Garda Password</label>
                </div>
              </div>
              <Link to="/map">
                <button className="btn primary-background">Login</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
       <div className="background">
         <img src="/images/gardaBackground.jpg"  alt="background"/>
       </div>
    </div>
  );
}

export default Login;
