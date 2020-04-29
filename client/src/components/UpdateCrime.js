import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './SideNav.css'
import './CrimeInfo.css'
import GoogleMapReact from 'google-map-react'
import GoogleMap from './GoogleMap.js'
import CreateReport from './CreateReport'

import Marker from './Marker.js'
import M from 'materialize-css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const axios = require('axios');


  

export class UpdateCrime extends Component {
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
        dataLoaded: false,
        displayCreateReport:false
    }


    async componentDidMount(){

        // Get crime details 
        const response = await axios.get('/api/crime/'+this.props.id, {headers: {'Authorization': "Bearer "+localStorage.getItem('jwtToken')}}).then((response) =>{
            this.setState({
                id: response.data[0].id,
                latitude: response.data[0].latitude,
                longitude: response.data[0].longitude,
                datetime: response.data[0].datetime,
                crimeType: response.data[0].crimeType,
                crimeDescription: response.data[0].crimeDescription,
                suspectDescription: response.data[0].suspectDescription,
                dangers: response.data[0].dangers,
                victimContact: response.data[0].victimContact,
                urgency: response.data[0].urgency,
                attendeeCount: response.data[0].attendeeCount,
                status: response.data[0].status,
                division_id: response.data[0].division_id

                
            }, ()=>{this.setState({dataLoaded:true})});
      
            
        }).catch(function(error){
            console.error(error)
            toast(`Failed to retrieve crime data from server.`,{
                type: toast.TYPE.ERROR,
                position: toast.POSITION.TOP_CENTER
            });
        })




    }

    onExitClick(){
        this.props.closeCrimeDialog();
    }

    async updateCrime(){
        var urgency = document.querySelector('input[name="urgency_group"]:checked').value;

        // Auto fill location and id data from props
        var formData = {
            id: this.props.id,
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            crimeType: document.getElementById("updatecrime_crime").value,
            crimeDescription: document.getElementById("updatecrime_description").value,
            victimContact: document.getElementById("updatecrime_victim").value,
            urgency: urgency,
            dangers: document.getElementById("updatecrime_dangers").value,
            suspectDescription: document.getElementById("updatecrime_suspect").value,
            division_id: localStorage.getItem('user_division_id'),
            staff_id: localStorage.getItem('user_id')
        }

        console.log(formData)
        const response = await axios.post('/api/crime/update',formData , {headers: {'Authorization': "Bearer "+localStorage.getItem('jwtToken')}}).then(function(){
            console.log("done")
            toast(`Crime update has been sent to the Gardaí`,{
                type: toast.TYPE.INFO,
                position: toast.POSITION.TOP_CENTER
            });
      
      
        }).catch(function(){
            toast(`Crime failed to update, check your fields and try again`,{
                type: toast.TYPE.ERROR,
                position: toast.POSITION.TOP_CENTER
            });
        })
        this.onExitClick()

    }

    async markResolved(id){
        // Mark crime as resolved
        const response = await axios.get(`/api/crime/${id}/resolve` , {headers: {'Authorization': "Bearer "+localStorage.getItem('jwtToken')}});


        toast(`Crime #${id} marked as resolved.`,{
            type: toast.TYPE.INFO,
            position: toast.POSITION.TOP_CENTER
        });
        this.onExitClick()
    }



    render() {

        
        if(this.state.dataLoaded){

            var dateDisplay = this.state.datetime.replace('Z','')
            dateDisplay = dateDisplay.replace('T', ' ')
            dateDisplay = dateDisplay.replace('.000', '')
            var dateFormatted = new Date(Date.parse(dateDisplay))
            

            return (
                <div className="col s10 m6 offset-s1 offset-m3" style={{display:"block",position:"absolute", top:"15px", zIndex:"5", left:"0", right:"0"}} className="center-align">
                    <div className="container">
                        <div className="row">
                            <div ></div>
                            <div className="col s12  m2 offset-m5 l2" style={{width: "100%"}}>
                            <div className="card z-depth-5" style={{}} >
                                <div className="card-image" style={{height: "20%"}}>
                                <ul style={{position: "absolute", zIndex: "5", left: "15px"}}>
                                    <li>
                                    <button className="btn-floating btn-large waves-effect " onClick={() => this.props.closeCrimeDialog()}><i className={this.props.color + " material-icons"} style={{color:"white", fontSize: "45px"}}>arrow_back</i></button>
                                    </li>
                                </ul>
                                {/* <img src="images/gardaBackground.jpg"/> */}
                                <div className={this.props.color + " box"} style={{height: "20vh"}}/>

                                <span className="card-title" style={{color: "white", fontWeight:500, fontSize:"3.4rem"}}>Update Crime</span>
                                </div>
                                <div className="card-content">
                                    </div>

                                    <div className="container">
                                        <table id="crimeInfoTable">
                                            <thead>

                                            </thead>
                                            <tbody>
                                                <tr><th rowSpan="2"><p style={{fontWeight:"bold", textAlign:"center"}}>{dateFormatted.toGMTString().replace("\"", "")}</p></th></tr>
                                                <tr><th>Crime </th>
                                                <td>
                                                <div className="input-field col s10">
                                                    <input id="updatecrime_crime" type="text" className="validate" defaultValue={this.state.crimeType} required />
                                                </div>
                                                </td></tr>
                                                <tr><th>Description</th>
                                                <td><div className="input-field col s10">
                                                    <input id="updatecrime_description" type="text" className="validate" defaultValue={this.state.crimeDescription} required/>
                                                </div></td></tr>
                                                <tr><th>Contact</th>
                                                <td><div className="input-field col s10">
                                                    <input id="updatecrime_victim" type="text" className="validate" defaultValue={this.state.victimContact} required/>
                                                </div></td></tr>
                                                <tr><th>Urgency</th>
                                                <td> <div className="input-field col s10">
                                                    
                                                <p>
                                                    <label>
                                                        {this.state.urgency == "1" ?
                                                        <input name="urgency_group" type="radio" className="priority1" value="1" defaultChecked/>
                                                        :
                                                        <input name="urgency_group" type="radio" className="priority1" value="1"  />
                                                        }
                                                        <span>Low-priority</span>
                                                    </label>
                                                    </p>
                                                    <p>
                                                    <label>
                                                    {this.state.urgency == "2" ?
                                                        <input name="urgency_group" type="radio" className="priority2" value="2" defaultChecked/>
                                                        :
                                                        <input name="urgency_group" type="radio" className="priority2" value="2"  />
                                                        }                                                        
                                                        <span>Medium-priority</span>
                                                    </label>
                                                </p>
                                                <p>
                                                    <label>
                                                    {this.state.urgency == "3" ?
                                                        <input name="urgency_group" type="radio" className="priority3" value="3" defaultChecked/>
                                                        :
                                                        <input name="urgency_group" type="radio" className="priority3" value="3"  />
                                                        }                                                        
                                                        <span>High-priority</span>
                                                    </label>
                                                    </p>
                                                    <p>
                                                    <label>
                                                    {this.state.urgency == "4" ?
                                                        <input name="urgency_group" type="radio" className="priority4" value="4" defaultChecked/>
                                                        :
                                                        <input name="urgency_group" type="radio" className="priority4" value="4"  />
                                                        }                                                        
                                                        <span>Urgent-priority</span>
                                                    </label>
                                                </p>

                                                </div></td></tr>
                                                <tr><th>Dangers</th>
                                                <td><div className="input-field col s10">
                                                    <input id="updatecrime_dangers" type="text" className="validate" defaultValue={this.state.dangers} required/>
                                                </div></td></tr>
                                                <tr><th>Suspect(s)</th>
                                                <td><div className="input-field col s10">
                                                    <input id="updatecrime_suspect" type="text" className="validate" defaultValue={this.state.suspectDescription} required/>
                                                </div></td></tr>

                                            </tbody>
                                        </table>
                                    </div>
                                {this.props.staffType == "dispatcher" ?
                                    <div className="card-action" style={{paddingTop:"30px", paddingBottom: "30px"}}>
                                        <a href="#" className="btn green crime-card-button" onClick={() => this.updateCrime(this.props.id)} style={{margin: "15px"}}>Update Crime</a>
                                        <a href="#" className="btn primary-background crime-card-button" onClick={() => this.markResolved(this.props.id)}>Mark Resolved</a>
                                    </div>
                                  :
                                   ''
                                }

                            </div>
                            </div>
                        </div>
                    </div>
                    { this.state.displayCreateReport == true &&
                        <div className="createReportDialog">
                            <CreateReport closeReportDialog={this.closeReportDialog} crime_id={this.state.id}/>
                        </div>
                    }

                </div>
            )
        }else{
            return null;
        }
    }
}

export default UpdateCrime
