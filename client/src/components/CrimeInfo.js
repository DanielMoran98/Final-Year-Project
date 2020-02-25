import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './SideNav.css'
import GoogleMapReact from 'google-map-react'
import GoogleMap from './GoogleMap.js'
import Marker from './Marker.js'
import M from 'materialize-css';


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
  

export class CrimeInfo extends Component {
    static defaultProps = {
        center: {
          lat: 53.35,
          lng: -6.26
        },
        zoom: 13,
        height: "100vh",
      };
    state = {
        id: null,
        latitude: null,
        longitude: null,
        datetime: null,
        crimeType: null,
        crimeDescription: null,
        suspectDescription: null,
        dangers: null,
        victimContact: null,
        urgency: null,
        attendeeCount: null,
        status: null,
        division_id: null,
        dataLoaded: false
    }


    async componentDidMount(){
        const url = "/api/crime/"+this.props.id;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data[0].crimeType)

        this.setState({
            id: data[0].id,
            latitude: data[0].latitude,
            longitude: data[0].longitude,
            datetime: data[0].datetime,
            crimeType: data[0].crimeType,
            crimeDescription: data[0].crimeDescription,
            suspectDescription: data[0].suspectDescription,
            dangers: data[0].dangers,
            victimContact: data[0].victimContact,
            urgency: data[0].urgency,
            attendeeCount: data[0].attendeeCount,
            status: data[0].status,
            division_id: data[0].division_id
        }, () => {this.setState({dataLoaded: true})});

    }

    onExitClick(){
        // ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this).parentNode);
        this.props.closeCrimeDialog();
    }

    render() {

        
        if(this.state.dataLoaded){
            return (
                <div>
                    <div className="row">
                        <div className="col s12 m6" style={{width: "100%"}}>
                        <div className="card z-depth-5" style={{}} >
                            <div className="card-image" style={{height: "20%"}}>
                            <ul style={{position: "absolute", zIndex: "5", left: "15px"}}>
                                <li>
                                <button className="btn-floating btn-large waves-effect " onClick={() => this.props.closeCrimeDialog()}><i className="material-icons primary-background" style={{color:"white", fontSize: "45px"}}>arrow_back</i></button>
                                </li>
                            </ul>
                            {/* <img src="images/gardaBackground.jpg"/> */}
                            <img src="images/blue-box.svg" style={{maxHeight: "20vh"}}/>
{/*                             <
                            <GoogleMapReact 
                                      bootstrapURLKeys={{ key: "AIzaSyA7qsNPuWR4K4RncWMv1sFfxUIJG-7zOh0" }}
                                      defaultCenter={
                                          {
                                              lat: this.state.latitude,
                                             lng:this.state.longitude
                                         }
                                        }
                                      defaultZoom={13}
                                      options={{    disableDefaultUI: true,
                                        gestureHandling:"greedy"}}
                            >
                                <Marker nameeee="testtt" id={this.state.id} lat={this.state.latitude} lng={this.state.longitude} color={this.state.color} />

                            </GoogleMapReact> */}

                            {/* Should this be a GoogleMapReact^^^ ? */}
                            <span className="card-title" style={{color: "white", fontWeight:500, fontSize:"3.4rem"}}>Crime Info</span>
                            </div>
                            <div className="card-content">
                            {/* <GoogleMap/> */}
                                <p style={{fontWeight:"bold"}}>Crime #{this.state.id}</p>
                                </div>

                                <div className="container">
                                    <table id="crimeInfoTable">
                                        <thead>

                                        </thead>
                                        <tbody>
            {/* <tr><th>Location</th><td>Latitude: {this.state.latitude} Longitude: {this.state.longitude}<br/></td></tr> */}
                                            <tr><th>Crime</th><td>{this.state.crimeType}</td></tr>
                                            <tr><th>Description</th><td>{this.state.crimeDescription}</td></tr>
                                            <tr><th>Contact</th><td>{this.state.victimContact}</td></tr>
                                            <tr><th>Urgency</th><td>Level {this.state.urgency}</td></tr>
                                            <tr><th>Dangers</th><td>{this.state.dangers}</td></tr>
                                            <tr><th>Suspect(s)</th><td>{this.state.suspectDescription}</td></tr>
                                            <tr><th>Status</th><td>{this.state.status}</td></tr>
                                            <tr><th>Attending</th><td>{this.state.attendeeCount} Units</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            <div className="card-action" style={{paddingTop:"30px", paddingBottom: "30px"}}>
                                <a href="#" className="btn primary-background">Attend</a>
                                <a href="#" className="btn primary-background" style={{margin: "15px"}}>Create Report</a>
                                <a href="#" className="btn primary-background">Mark Resolved</a>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            )
        }else{
            return null;
        }
    }
}

export default CrimeInfo
