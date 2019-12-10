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
<style dangerouslySetInnerHTML={{__html: "\n  nav a.sidenav-trigger {\n    display: inline !important;\n  }\n  " }} />

  <nav className="transparent"><a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a> <span className="userName">Sgt. Daniel Moran</span></nav>
  <ul id="slide-out" className="sidenav">
    <li>Sgt. Daniel Moran</li>
    <li><div className="divider" /></li>
    <li><a className="waves-effect" href="#!">My reports</a></li>
    <li><a className="waves-effect" href="#!">Information</a></li>
    <li><a className="waves-effect" href="#!">Settings</a></li>
    <li><a className="waves-effect" href="#!">End patrol</a></li>

    <li><div className="divider" /></li>
    <li><a className="subheader">GERM Version 0.1</a></li>

  </ul>
</div>

  
    )
  }
}

export default SideNav;
