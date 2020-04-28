import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './SideNav.css'
import './CreateCrime.css'
import GoogleMapReact from 'google-map-react'
import GoogleMap from './GoogleMap.js'
import Marker from './Marker.js'
import M from 'materialize-css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const axios = require("axios")


  

export class CreateCrime extends Component {
    constructor(props){
        super(props);
  
    }

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
    }


    
    async componentDidMount(){


        this.setState({

        }, () => {this.setState({dataLoaded: true})});

    }

    onExitClick(){
        this.props.closeCrimeDialog();
    }

    async createCrime(){

        var urgency = document.querySelector('input[name="urgency_group"]:checked').value;

        var formData = {
            latitude: this.props.crimeLat,
            longitude: this.props.crimeLng,
            crimeType: document.getElementById("crime_crime").value,
            crimeDescription: document.getElementById("crime_description").value,
            victimContact: document.getElementById("crime_victim").value,
            urgency: urgency,
            dangers: document.getElementById("crime_dangers").value,
            suspectDescription: document.getElementById("crime_suspect").value,
            division_id: localStorage.getItem('user_division_id'),
            staff_id: localStorage.getItem('user_id')
        }

        console.log(formData)
        const response = await axios.post('/api/crime/create',formData , {headers: {'Authorization': "Bearer "+localStorage.getItem('jwtToken')}}).then(function(){
            console.log("done")
            toast(`Crime sent to the Gardaí`,{
                type: toast.TYPE.INFO,
                position: toast.POSITION.TOP_CENTER
            });
      
      
        }).catch(function(){
            toast(`Crime failed to submit, check your fields and try again`,{
                type: toast.TYPE.ERROR,
                position: toast.POSITION.TOP_CENTER
            });
        })



        // console.log("Res: "+response)
        this.onExitClick()

 
    }

    render() {

        
        if(this.state.dataLoaded){

            // var dateDisplay = this.state.datetime.replace('Z','')
            // dateDisplay = dateDisplay.replace('T', ' ')
            // dateDisplay = dateDisplay.replace('.000', '')
            var dateFormatted = new Date()
            var dateFormatted2 =new Date()


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
                                    <button className="btn-floating btn-large waves-effect " onClick={() => this.props.closeCrimeDialog()}><i className={"blue" + " material-icons"} style={{color:"white", fontSize: "45px"}}>arrow_back</i></button>
                                    </li>
                                </ul>
                                <div className={"blue" + " box"} style={{height: "20vh"}}/>

                                <span className="card-title" style={{color: "white", fontWeight:500, fontSize:"3.4rem"}}>Create Crime</span>
                                </div>
                                <div className="card-content">
                                    </div>

                                    <div className="container">
                                        <table id="createCrimeTable">
                                            <thead>

                                            </thead>
                                            <tbody>
                                                <tr><th rowSpan="2"><p style={{fontWeight:"bold", textAlign:"center"}}>{dateFormatted.toUTCString()}</p></th></tr>
                                                <tr><th>Crime </th>
                                                <td>
                                                <div className="input-field col s10">
                                                    <input id="crime_crime" type="text" className="validate" required />
                                                    <label htmlFor="crime_crime">Crime</label>
                                                </div>
                                                </td></tr>
                                                <tr><th>Description</th>
                                                <td><div className="input-field col s10">
                                                    <input id="crime_description" type="text" className="validate" required/>
                                                    <label htmlFor="crime_description">Crime Description</label>
                                                </div></td></tr>
                                                <tr><th>Contact</th>
                                                <td><div className="input-field col s10">
                                                    <input id="crime_victim" type="text" className="validate" required/>
                                                    <label htmlFor="crime_victim">Victim Contact</label>
                                                </div></td></tr>
                                                <tr><th>Urgency</th>
                                                <td> <div className="input-field col s10">
                                                    
                                                <p>
                                                    <label>
                                                        <input name="urgency_group" type="radio" className="priority1" value="1" defaultChecked />
                                                        <span>Low-priority</span>
                                                    </label>
                                                    </p>
                                                    <p>
                                                    <label>
                                                        <input name="urgency_group" type="radio" className="priority2" value="2" />
                                                        <span>Medium-priority</span>
                                                    </label>
                                                </p>
                                                <p>
                                                    <label>
                                                        <input name="urgency_group" type="radio" className="priority3" value="3"/>
                                                        <span>High-priority</span>
                                                    </label>
                                                    </p>
                                                    <p>
                                                    <label>
                                                        <input name="urgency_group" type="radio" className="priority4" value="4" />
                                                        <span>Urgent-priority</span>
                                                    </label>
                                                </p>

                                                </div></td></tr>
                                                <tr><th>Dangers</th>
                                                <td><div className="input-field col s10">
                                                    <input id="crime_dangers" type="text" className="validate" required/>
                                                    <label htmlFor="crime_dangers">Potential Dangers</label>
                                                </div></td></tr>
                                                <tr><th>Suspect(s)</th>
                                                <td><div className="input-field col s10">
                                                    <input id="crime_suspect" type="text" className="validate" required/>
                                                    <label htmlFor="crime_suspect">Suspect Description</label>
                                                </div></td></tr>

                                            </tbody>
                                        </table>
                                    </div>
                                <div className="card-action" style={{paddingTop:"30px", paddingBottom: "30px"}}>
                                    <a href="#"  className="btn primary-background crime-card-button" style={{marginRight: 20}} onClick={() => this.createCrime()}>Submit</a>
                                    <a href="#" className="btn red crime-card-button" onClick={() => this.props.closeCrimeDialog()}>Cancel</a>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }else{
            return (<div>CreateCrime not loaded</div>);
        }
    }
}

export default CreateCrime
