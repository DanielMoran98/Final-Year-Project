import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import M from 'materialize-css';
import './SideNav.css';
import CrimeInfo from "./CrimeInfo";
import UpdateCrime from "./UpdateCrime";

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
      // React Portal renders the CrimeInfo component at a different place in the DOM Tree
      return ReactDOM.createPortal(
        <div className="markerContainer">
          {/* If user is a garda, serve CrimeInfo component, otherwise serve UpdateCrime component for dispatcher */}
            {this.props.staffType == "garda" ?
              <CrimeInfo id={this.props.id} color={this.props.color} closeCrimeDialog={this.closeCrimeDialog} staffType={this.props.staffType}/>
              :
              <UpdateCrime id={this.props.id} color={this.props.color} closeCrimeDialog={this.closeCrimeDialog} staffType={this.props.staffType} latitude={this.props.lat} longitude={this.props.lng}/>
            }
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
