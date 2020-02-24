import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import M from 'materialize-css';
import './SideNav.css';
import CrimeInfo from "./CrimeInfo";

const root = document.getElementById('root')

class Marker extends Component {
  constructor(props){
      super(props);
      this.state = {
          id: props.id,
          color: props.color,
          showDialog: false
      };

    this.closeCrimeDialog = this.closeCrimeDialog.bind(this)

  }

  updateColor(newColor){
    this.setState({color: newColor})
  }
  
  openCrimeDialog(){
    this.setState({showDialog:true})
  }

  closeCrimeDialog(){
    this.setState({showDialog:false})
  }

  render() {

    if(this.state.showDialog == true){

      return ReactDOM.createPortal(
        <div className="markerContainer">
            {/* <a href="#" onClick={() => this.openCrimeDialog()}><img src={"/images/markers/pin-"+this.state.color+".png"} style={{backgroundcolor: this.props.color}} height="24px"/></a> */}
            <div className="col s10 m6 offset-s1 offset-m3" style={{display:"block",position:"absolute", top:"15px", zIndex:"5", left:"0", right:"0"}} className="center-align">

              <CrimeInfo id={this.props.id} color={this.props.color} closeCrimeDialog={this.closeCrimeDialog} />
            </div>
        </div>
     ,
     root)

    }else{
      return(
        <div className="markerContainer">
            <a href="#" onClick={() => this.openCrimeDialog()}><img src={"/images/markers/pin-"+this.state.color+".png"} style={{backgroundcolor: this.props.color}} height="24px"/></a>
        </div>
      )
    }

  }
}

export default Marker;
