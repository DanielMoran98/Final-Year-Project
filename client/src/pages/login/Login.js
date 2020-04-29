import React from 'react';
import './Login.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const axios = require('axios');


function Login() {

  function submitLogin(email, password){

    axios.post('/login', {
      email: email,
      password: password
    })
    .then(function (response) {
      console.log("res");
      if(response.data == "Login failed"){
        // Notify user of failed login
        toast(`Login Failed`,{
          type: toast.TYPE.ERROR,
          position: toast.POSITION.TOP_CENTER
      });
      }else{
        // Login success, store account details and Auth token locally
        toast(`Login Success!`,{
          type: toast.TYPE.SUCCESS,
          position: toast.POSITION.TOP_CENTER
        });
        localStorage.setItem('jwtToken', response.data.token);
        localStorage.setItem('user_id', response.data.user.id);
        localStorage.setItem('user_name', response.data.user.name);
        localStorage.setItem('user_rank', response.data.user.rank);
        localStorage.setItem('user_badgeNumber', response.data.user.badgeNumber);
        localStorage.setItem('user_staffType', response.data.user.staffType);
        localStorage.setItem('user_email', response.data.user.email);
        localStorage.setItem('user_phone', response.data.user.phone);
        localStorage.setItem('user_division_id', response.data.user.division_id);
        axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('jwtToken')
        console.log("Auth: "+localStorage.getItem('Authorization'))
        setTimeout(()=>{window.location.replace("/map")}, 1500);
      }
      console.log(response.data);
    })
    .catch(function (error) {
      console.log("err");

      console.log(error);
    });
  }
  return (
    
    <div className="Login">

      
      <div className="container">
        <div className="row">
          <div className ="col m6 offset-m3 s10 offset-s1">
            <div className="loginBox">
              <h1>Login</h1>
                <div className="row">
                  <div className="input-field">
                    <input id="emailField" type="email" className="validate" name="email" required/>
                    <label className="active" htmlFor="emailField" >Garda Email</label>
                  </div>
                </div>
                <div className="row">
                <div className="input-field">
                  <input id="passwordField" type="password" className="validate" name="password" required/>
                  <label className="active" htmlFor="passwordField" >Garda Password</label>
                </div>
              </div>
              <button type="button" onClick={() => submitLogin(document.getElementById("emailField").value, document.getElementById("passwordField").value)} className="btn primary-background">Login</button>
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
