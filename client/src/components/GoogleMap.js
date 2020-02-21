import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from "./Marker"
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

  async componentDidMount(){
    const url = "/api/crime/all";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    // console.log(data[0].id)
    // console.log(data[0].longitude)
    // console.log(data[0].latitude)
    // console.log(data.length)
    
    //Create a copy of the current markers array
    var newMarkers = this.state.markers.slice();
    for(var i = 0; i < data.length ; i++){
      console.log(data[i].id)
      var marker = {
        id: data[i].id,
        lat: data[i].latitude,
        lng: data[i].longitude,
        color: "red"
      }
      //Push each object to the array
      newMarkers.push(marker);
    }

    // Update the state with the new array
    this.setState({markers: newMarkers});

  }
  render() {

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: this.props.height, width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyA7qsNPuWR4K4RncWMv1sFfxUIJG-7zOh0" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          options={createMapOptions}  
        >
          
          {/* Here Im trying to access the array from the jsx */}
          {console.log("Markers        "+ JSON.stringify(this.state.markers))}
          {console.log("Markers[0]     "+ JSON.stringify(this.state.markers[0]))}
          {console.log("Markers[1]     "+ JSON.stringify(this.state.markers[1]))}

          {/* {console.log("Markers[1].id  "+ JSON.stringify(this.state))} */}



          {/* Some hardcoded Markers for now */}
          <Marker
          id={1}
          lat={53.352}
          lng={-6.264}
          color="green"
          />
          <Marker
          id={2}
          lat={53.3512}
          lng={-6.26234}
          color="red"
          />
          <Marker
          id={3}
          lat={53.354}
          lng={-6.2632}
          color="orange"
          />

        </GoogleMapReact>
      </div>
    );
  }
}

export default GoogleMap;
