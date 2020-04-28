import React, { Component } from 'react';
import M from 'materialize-css';
import './SideNav.css'
const axios = require('axios');

class SideNav extends Component {
  
  componentDidMount(){
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.sidenav');
      var instances = M.Sidenav.init(elems, {});
    });
  }

  render() {
    async function logout(){
      var formData = {user_id: localStorage.getItem('user_id')}
      const response = await axios.post('/logout', formData , {headers: {'Authorization': "Bearer "+localStorage.getItem('jwtToken')}}).then(function(){
        console.log("done")

        }).catch(function(){
          console.error("Couldnt connect to server")
        })

      localStorage.setItem('jwtToken', '');
      window.location.replace("/")
      console.log(localStorage.getItem('jwtToken'))
    }

    return (

  <div>
    
    <nav className="transparent"></nav>
    <ul id="slide-out" className="sidenav">
      <li>{localStorage.getItem('user_rank')}. {localStorage.getItem('user_name')}</li>
      <li><div className="divider" /></li>
      <li><a className="waves-effect" href="#!">My reports</a></li>
      <li><a className="waves-effect" href="#!">Information</a></li>
      <li><a className="waves-effect" href="#!">Settings</a></li>
      <li><a className="waves-effect" href="#!" onClick={() => logout()}>End patrol</a></li>

      <li><div className="divider" /></li>
      <li><a className="subheader germ-version">GERM Version 0.1</a></li>

    </ul>
  </div>

  
    )
  }
}

export default SideNav;
