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

                
            });
      
            
        }).catch(function(error){
            console.error(error)
            toast(`Failed to retrieve crime data from server.`,{
                type: toast.TYPE.ERROR,
                position: toast.POSITION.TOP_CENTER
            });
        })

        // Check if user is already attending this crime

        var data = {
            crime_id: this.props.id,
            staff_id: localStorage.getItem('user_id')
        }

        const res = await axios.post('/api/assignment/checkattendance', data , {headers: {'Authorization': "Bearer "+localStorage.getItem('jwtToken')}}).then((res) =>{
            console.log(res.data)
            if(res.data == "Attending"){
                this.setState({attendingCrime: true},() => {
                    this.setState({dataLoaded: true})
                }) 
            }else{
                this.setState({attendingCrime: false}, () => {
                    this.setState({dataLoaded: true})
                }) 
            }
            
        }).catch(function(error){
            console.error(error)
            toast(`Failed to retrieve attendance data from server.`,{
                type: toast.TYPE.ERROR,
                position: toast.POSITION.TOP_CENTER
            });
        })


    }

    onExitClick(){
        this.props.closeCrimeDialog();
    }

    closeReportDialog=()=>{
        this.setState({displayCreateReport: false})
    }    
    openReportDialog=()=>{
        this.setState({displayCreateReport: true})
    }

    async markResolved(id){
        // Mark crime as resloved by Garda
        const response = await axios.get(`/api/crime/${id}/resolve` , {headers: {'Authorization': "Bearer "+localStorage.getItem('jwtToken')}});


        toast(`Crime #${id} marked as resolved.`,{
            type: toast.TYPE.INFO,
            position: toast.POSITION.TOP_CENTER
        });
        this.onExitClick()
    }

    async markAttending(crime_id, staff_id){
        // Mark Garda as attending the crime

        var postData = {
            crime_id: crime_id,
            staff_id: staff_id
        }
        console.log(postData)
        const response = await axios.post(`/api/assignment/create`, postData , {headers: {'Authorization': "Bearer "+localStorage.getItem('jwtToken')}});



        toast(`You have marked yourself as attending Crime #${crime_id}.`,{
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

                                <span className="card-title" style={{color: "white", fontWeight:500, fontSize:"3.4rem"}}>Crime #{this.state.id}</span>
                                </div>
                                <div className="card-content">
                                    </div>

                                    <div className="container">
                                        <table id="crimeInfoTable">
                                            <thead>

                                            </thead>
                                            <tbody>
                                                <tr><th rowSpan="2"><p style={{fontWeight:"bold", textAlign:"center"}}>{dateFormatted.toGMTString().replace("\"", "")}</p></th></tr>
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
                                {this.props.staffType == "dispatcher" ?
                                    <div className="card-action" style={{paddingTop:"30px", paddingBottom: "30px"}}>
                                        <a href="#" className="btn primary-background crime-card-button" onClick={() => this.markResolved(this.props.id)}>Mark Resolved</a>
                                    </div>
                                  :
                                   ''
                                }
                                {this.props.staffType == "garda" ?
                                    <div className="card-action" style={{paddingTop:"30px", paddingBottom: "30px"}}>
                                        {!this.state.attendingCrime ?
                                            <a href="#" className="btn primary-background crime-card-button" onClick={() => this.markAttending(this.props.id, localStorage.getItem('user_id'))}>Attend Crime</a>
                                         :
                                         <div></div>
                                         }
                                        {/* <a href="#" className="btn primary-background crime-card-button" onClick={() => this.markAttending(this.props.id, localStorage.getItem('user_id'))}>Attend Crime</a> */}
                                        <a href="#" className="btn primary-background crime-card-button" onClick={() => this.openReportDialog()} style={{margin: "15px"}}>Create Report</a>
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

export default CrimeInfo
