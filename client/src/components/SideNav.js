import React, { Component } from 'react';
import M from 'materialize-css';
import './SideNav.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShowReports from './ShowReports'

const axios = require('axios');

class SideNav extends Component {
  constructor(props){
    super(props);

  }

  state = {
    showReportsDialog:false
  }
  
  componentDidMount(){
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.sidenav');
      var instances = M.Sidenav.init(elems, {});
    });
  }

  openShowReportsDialog = () =>{
    this.setState({showReportsDialog: true})
    console.log("Test")
  }

  closeShowReportsDialog = () =>{
    this.setState({showReportsDialog: false})
  }

  render() {

    async function logout(){
      // Handle logout, clear auth token and redirect
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

    function onInformationButtonClick(){
      toast(`This is the Garda Electronic Resource Manager developed by Daniel Moran.`,{
        type: toast.TYPE.INFO,
        position: toast.POSITION.TOP_LEFT
      });
    }

    return (

  <div>
    
    <nav className="transparent"></nav>
    <ul id="slide-out" className="sidenav">
      <li>{localStorage.getItem('user_rank')}. {localStorage.getItem('user_name')}</li>
      <li><div className="divider" /></li>
      {this.props.staffType == "garda" ?
        <li><a className="waves-effect" href="#!" onClick={() => this.openShowReportsDialog()}>My reports</a></li>          : <div></div>
      }
      
      <li><a className="waves-effect" href="#!" onClick={() => onInformationButtonClick()}>Information</a></li>
      <li><a className="waves-effect" href="#!"onClick= {() => window.location.replace('/statistics')}>Statistical view</a></li>
      <li><a className="waves-effect" href="#!" onClick={() => logout()}>End patrol</a></li>

      <li><div className="divider" /></li>
      <li><a className="subheader germ-version">GERM Version 0.1</a></li>

    </ul>
    {this.state.showReportsDialog == true ?
      <div id="showReportsContainer" style={{zIndex:500}}>
        <ShowReports closeShowReportsDialog={this.closeShowReportsDialog} staff_id={localStorage.getItem("user_id")}/>
      </div>
    :
     <div></div>
    }
  </div>

  
    )
  }
}

export default SideNav;
