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

  };


  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyA7qsNPuWR4K4RncWMv1sFfxUIJG-7zOh0" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          options={createMapOptions}
          
        >
          <Marker
           lat={53.352}
           lng={-6.264}
           color="green"
          />
          <Marker
           lat={53.3512}
           lng={-6.26234}
           color="red"
          />
          <Marker
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
