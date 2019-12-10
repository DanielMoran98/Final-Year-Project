import React, { Component } from 'react';
import M from 'materialize-css';
import './SideNav.css'

class Marker extends Component {
  constructor(props){
      super(props);
      this.state = {
          color: props.color
      };
  }
    
  render() {
    return (
        <div className="markerContainer">
            <img src={"/images/markers/pin-"+this.props.color+".png"} style={{backgroundcolor: this.props.color}} height="24px"/>
        </div>  
    )
  }
}

export default Marker;
