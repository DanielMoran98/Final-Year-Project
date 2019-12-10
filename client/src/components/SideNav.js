import React, { Component } from 'react';
import M from 'materialize-css';

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

  <nav><a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a> Sgt. Daniel Moran</nav>
  <ul id="slide-out" className="sidenav">
    <li>Sgt. Daniel Moran</li>
    <li><div className="divider" /></li>
    <li><a href="#!"><i className="material-icons">cloud</i>First Link With Icon</a></li>
    <li><a href="#!">My reports</a></li>
    <li><a href="#!">Information</a></li>
    <li><a href="#!">Settings</a></li>
    <li><a href="#!">End patrol</a></li>

    <li><div className="divider" /></li>
    <li><a className="subheader">Version 0.1</a></li>
    <li><a className="waves-effect" href="#!">Third Link With Waves</a></li>
  </ul>
</div>

  
    )
  }
}

export default SideNav;
