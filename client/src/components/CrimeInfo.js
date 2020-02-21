import React, { Component } from 'react'
import './SideNav.css'
import GoogleMapReact from 'google-map-react'
import GoogleMap from './GoogleMap.js'
import M from 'materialize-css';

export class CrimeInfo extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col s12 m6">
                    <div className="card z-depth-5" style={{minWidth: "500px"}} >
                        <div className="card-image" style={{height: "20%"}}>
                        <ul style={{position: "absolute", zIndex: "5", left: "15px"}}>
                            <li>
                             <a className="btn-floating btn-large waves-effect waves-light white"><i className="material-icons" style={{color:"black", fontSize: "45px"}}>arrow_back</i></a>
                            </li>
                        </ul>
                        {/* <img src="images/gardaBackground.jpg"/> */}
                        {/* <GoogleMap height="30vh"/> */}
                        {/* Should this be a GoogleMapReact^^^ ? */}
                        <span className="card-title" style={{color: "black", fontWeight:500, fontSize:"2.4rem"}}>Crime Info</span>
                        </div>
                        <div className="card-content">
                        {/* <GoogleMap/> */}
                            <p style={{fontWeight:"bold"}}>Crime #1324</p>
                            </div>

                            <div className="container">
                                <table id="crimeInfoTable">
                                    <thead>

                                    </thead>
                                    <tbody>
                                        <tr><th>Location</th><td>Finglas</td></tr>
                                        <tr><th>Crime</th><td>Mugging</td></tr>
                                        <tr><th>Description</th><td>joey got robbed by dylan</td></tr>
                                        <tr><th>Contact</th><td>08517482754</td></tr>
                                        <tr><th>Urgency</th><td>Level 3</td></tr>
                                        <tr><th>Dangers</th><td>Possible knife</td></tr>
                                        <tr><th>Suspect(s)</th><td>Red tshirt blue jeans</td></tr>
                                        <tr><th>Status</th><td>active</td></tr>
                                        <tr><th>Attending</th><td>3 Units</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        <div className="card-action" style={{paddingTop:"30px", paddingBottom: "30px"}}>
                            <a href="#" className="btn">Attend</a>
                            <a href="#" className="btn">Create Report</a>
                            <a href="#" className="btn">Mark Resolved</a>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CrimeInfo
