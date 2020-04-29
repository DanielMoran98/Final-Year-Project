import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import M from 'materialize-css';
import './SideNav.css';
import CrimeInfo from "./CrimeInfo";

const root = document.getElementById('root')

class User extends Component {
  constructor(props){
      super(props);
      this.state = {
      };


  }


  render() {


      return(
        <div className="userLocationContainer">
            <a href="#"><img src={"/images/markers/pin-user.png"} height="35px"/></a>
        </div>
      )
    

  }
}

export default User;
