import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from "./Marker"
import CrimeInfo from './CrimeInfo';
import M from 'materialize-css';
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
    renderCreateCrime: false
  };


  async componentDidMount(){

    try {
      const response = await axios.post('/api/crime/all', "", {headers: {'Authorization': "Bearer "+localStorage.getItem('jwtToken')}});
      console.log(response);
      var data = response.data
      //Create a copy of the current markers array
      var newMarkers = this.state.markers.slice();
      for(var i = 0; i < data.length ; i++){
        console.log(data[i].id)
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
      // Update the state with the new array
      this.setState({markers: newMarkers});

    } catch (error) {
      console.error(error);
      window.location.replace("/");

    }


    

  }
  render() {

    if (this.state.markers.length > 0) {

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
              return <Marker id={i.id} lat={i.lat} lng={i.lng} color={i.color} staffType={this.props.staffType}/>
             
            })}


        </GoogleMapReact>
   

        {/* <div className="col s10 m6 offset-s1 offset-m3" style={{display:"block",position:"absolute", top:"15px", zIndex:"5", left:"0", right:"0"}} className="center-align">
          <CrimeInfo/>
        </div> */}

          

      </div>
    );
  } else {
    return <div style={{position:"fixed", left:"50%", top:"50%"}}>LOADING</div> 
  }
  }
}

export default GoogleMap;
