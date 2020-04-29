import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from "./Marker"
import User from "./User"
import CrimeInfo from './CrimeInfo';
import M from 'materialize-css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import addNotification from 'react-push-notification';

const axios = require('axios');


class GoogleMap extends Component {
  static defaultProps = {
    center: {
      lat: 53.35,
      lng: -6.26
    },
    zoom: 13,
    height: "100vh",
  };
  
  state = {
    markers: [

    ],
    renderCreateCrime: false,
    errorDisplayed: false
  };

  async getMarkers(){
    // Get active crimes by user division 
    try {
      const response = await axios.post('/api/crime/division', {division_id: localStorage.getItem("user_division_id")}, {headers: {'Authorization': "Bearer "+localStorage.getItem('jwtToken')}});
      var data = response.data

      //Create a copy of the current markers array
      var newMarkers = []
      for(var i = 0; i < data.length ; i++){
        // For all active crimes
        if(data[i].status == "active"){
          var newColor = ""
          // Translate urgency values into colours
          switch (data[i].urgency) {
            case 1:
              newColor = "green";
              break;
            case 2:
              newColor = "yellow";
              break;
            case 3:
              newColor = "orange";
              break;
            case 4:
              newColor = "red";
              break;
          }

          var marker = {
            id: data[i].id,
            lat: data[i].latitude,
            lng: data[i].longitude,
            color: newColor
          }
          //Push each object to the array
          newMarkers.push(marker);
        }
      }

      // If there are no active crimes, set noCrimes to true
      if(newMarkers.length == 0){this.setState({noCrimes: true})}

      // If the current fetch of crimes has additional crimes, notify nearby active Gardaí that a new crime has been reported near them
      if(this.state.markers.length != 0 && this.state.markers.length < newMarkers.length && this.props.activityState == 'active'){
        addNotification({
          title: 'A new crime has been reported near your location',
          subtitle: 'New crime alert',
          message: 'A crime report has been added close to your location, check your map to see if you can help.',
          theme: 'darkblue',
          native: true
        });
      }
      // Update the state with the new array
      this.setState({markers: newMarkers});

    } catch (error) {
      if(this.state.errorDisplayed == false){
      // If the timer on the user's JWT expires, notify them and prompt to re-login
      this.setState({errorDisplayed: true})
      console.error(error);
      toast(`Your authentication token has expired, you are no longer authorized. Please log in again.`,{
        type: toast.TYPE.ERROR,
        position: toast.POSITION.TOP_CENTER
      });
      setTimeout(()=>window.location.replace("/"), 5000)
     }
    }
  }

  componentDidMount(){
    this.getMarkers()
    // Repeat getMarkers() every 1.5 seconds
    this.interval = setInterval(()=>this.getMarkers(), 1500);

  }

  componentWillUnmount() {
    // Clear the interval on component deletion
    clearInterval(this.interval);
  }
  
  render() {

    // Only render after API fetch complete

    if (this.state.markers.length > 0 || this.state.noCrimes == true) {

    return (
      
      // Important! Always set the container height explicitly
      <div style={{ height: this.props.height, width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyA7qsNPuWR4K4RncWMv1sFfxUIJG-7zOh0" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onClick = {this.props.onClick}
          options={
            {    
              disableDefaultUI: true,
              gestureHandling:"greedy",
              clickableIcons: false
            }
          }  
        >
        

        {this.props.staffType == "garda" ?
          <User key={10000} lat={this.props.userLat} lng={this.props.userLng}/>
          :
          null
        }

          {/* Populate map with markers from API / State */}
          {this.state.markers.map(i => {
              return <Marker id={i.id} key={i.id} lat={i.lat} lng={i.lng} color={i.color} staffType={this.props.staffType}/>
             
          })}


        </GoogleMapReact>
          

      </div>
    );
  } else {
    return <div style={{position:"fixed", left:"50%", top:"50%"}}>LOADING!</div> 
  }
  }
}

export default GoogleMap;
