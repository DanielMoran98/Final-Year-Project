import React, { Component } from 'react';
import M from 'materialize-css';
import './SideNav.css'


class Marker extends Component {
  constructor(props){
      super(props);
      this.state = {
          id: props.id,
          color: props.color
      };
  }
  updateColor(){
    this.setState({color:"green"})
  }

  render() {
    return (
        <div className="markerContainer">
            <a href="#" onClick={() => this.setState({color: "green"})}><img src={"/images/markers/pin-"+this.state.color+".png"} style={{backgroundcolor: this.props.color}} height="24px"/></a>
        </div>  
    )
  }
}

export default Marker;
