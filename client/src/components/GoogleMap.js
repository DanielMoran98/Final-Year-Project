import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from "./Marker"
import CrimeInfo from './CrimeInfo';
import M from 'materialize-css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const axios = require('axios');

const AnyReactComponent = ({ text }) => <div>{text}</div>;


function createMapOptions(maps) {
  // next props are exposed at maps
  // "Animation", "ControlPosition", "MapTypeControlStyle", "MapTypeId",
  // "NavigationControlStyle", "ScaleControlStyle", "StrokePosition", "SymbolPath", "ZoomControlStyle",
  // "DirectionsStatus", "DirectionsTravelMode", "DirectionsUnitSystem", "DistanceMatrixStatus",
  // "DistanceMatrixElementStatus", "ElevationStatus", "GeocoderLocationType", "GeocoderStatus", "KmlLayerStatus",
  // "MaxZoomStatus", "StreetViewStatus", "TransitMode", "TransitRoutePreference", "TravelMode", "UnitSystem"
  return {
    disableDefaultUI: true,
    gestureHandling:"greedy",
    clickableIcons: false
  };
}

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
    try {
      const response = await axios.post('/api/crime/division/post', {division_id: localStorage.getItem("user_division_id")}, {headers: {'Authorization': "Bearer "+localStorage.getItem('jwtToken')}});
      var data = response.data

      //Create a copy of the current markers array
      var newMarkers = []
      for(var i = 0; i < data.length ; i++){
        if(data[i].status == "active"){
          var newColor = ""
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
      
      if(newMarkers.length == 0){this.setState({noCrimes: true})}

      // Update the state with the new array
      this.setState({markers: newMarkers});

    } catch (error) {
      if(this.state.errorDisplayed == false){
      this.setState({errorDisplayed: true})
      console.error(error);
      toast(`Your authentication token has expired, you are no longer authorized. Please log in again.`,{
        type: toast.TYPE.ERROR,
        position: toast.POSITION.TOP_CENTER
      });
      setTimeout(()=>window.location.replace("/"), 5000)
      // window.location.replace("/");
     }
    }
  }

  componentDidMount(){
    this.getMarkers()
    this.interval = setInterval(()=>this.getMarkers(), 1500);

  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  render() {

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
        


          {/* Populate map with markers from API / State */}
          {this.state.markers.map(i => {
              return <Marker id={i.id} key={i.id} lat={i.lat} lng={i.lng} color={i.color} staffType={this.props.staffType}/>
             
            })}


        </GoogleMapReact>
   

        {/* <div className="col s10 m6 offset-s1 offset-m3" style={{display:"block",position:"absolute", top:"15px", zIndex:"5", left:"0", right:"0"}} className="center-align">
          <CrimeInfo/>
        </div> */}

          

      </div>
    );
  } else {
    return <div style={{position:"fixed", left:"50%", top:"50%"}}>LOADING!</div> 
  }
  }
}

export default GoogleMap;
