import React, { Component } from 'react';
import M from 'materialize-css';
import './SideNav.css'
class SideNav extends Component {
  
  componentDidMount(){
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.sidenav');
      var instances = M.Sidenav.init(elems, {});
    });
  }
  render() {
    return (
<div>

  <nav className="transparent"></nav>
  <ul id="slide-out" className="sidenav">
    <li>Sgt. Daniel Moran</li>
    <li><div className="divider" /></li>
    <li><a className="waves-effect" href="#!">My reports</a></li>
    <li><a className="waves-effect" href="#!">Information</a></li>
    <li><a className="waves-effect" href="#!">Settings</a></li>
    <li><a className="waves-effect" href="#!">End patrol</a></li>

    <li><div className="divider" /></li>
    <li><a className="subheader germ-version">GERM Version 0.1</a></li>

  </ul>
</div>

  
    )
  }
}

export default SideNav;
