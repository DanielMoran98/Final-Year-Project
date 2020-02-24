import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from "./Marker"
import CrimeInfo from './CrimeInfo';
import M from 'materialize-css';

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
    gestureHandling:"greedy"
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

    ]
  };

  createMapOptions(maps) {
    // next props are exposed at maps
    // "Animation", "ControlPosition", "MapTypeControlStyle", "MapTypeId",
    // "NavigationControlStyle", "ScaleControlStyle", "StrokePosition", "SymbolPath", "ZoomControlStyle",
    // "DirectionsStatus", "DirectionsTravelMode", "DirectionsUnitSystem", "DistanceMatrixStatus",
    // "DistanceMatrixElementStatus", "ElevationStatus", "GeocoderLocationType", "GeocoderStatus", "KmlLayerStatus",
    // "MaxZoomStatus", "StreetViewStatus", "TransitMode", "TransitRoutePreference", "TravelMode", "UnitSystem"
    return {
      disableDefaultUI: true,
      gestureHandling:"greedy"
    };
  }
  async componentDidMount(){
    const url = "/api/crime/all";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)

    
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
          options={createMapOptions}  
        >
        


          {/* Populate map with markers from API / State */}
          {this.state.markers.map(i => {
              return <Marker id={i.id} lat={i.lat} lng={i.lng} color={i.color} />
             
            })}

          {/* Some hardcoded Markers for now */}
          <Marker
          id={2}
          lat={53.352}
          lng={-6.264}
          color="green"
          />
          <Marker
          id={3}
          lat={53.3512}
          lng={-6.26234}
          color="red"
          />
          <Marker
          id={4}
          lat={53.354}
          lng={-6.2632}
          color="orange"
          />

        </GoogleMapReact>
   

        {/* <div className="col s10 m6 offset-s1 offset-m3" style={{display:"block",position:"absolute", top:"15px", zIndex:"5", left:"0", right:"0"}} className="center-align">
          <CrimeInfo/>
        </div> */}

          

      </div>
    );
  } else {
    return <div>LOADING</div> 
  }
  }
}

export default GoogleMap;
