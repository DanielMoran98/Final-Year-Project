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


  

export class CreateReport extends Component {
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
        this.props.closeReportDialog();
    }

    async createReport(){
        var reportContent = document.getElementById("report_content").value
        var crimeID = document.getElementById("report_crimeid").value
        var formData = {
            content: reportContent,           
            staff_id: localStorage.getItem('user_id'),
            crime_id: crimeID
        }

        console.log(formData)
        // Send the report to the server
        const response = await axios.post('/api/report/create',formData , {headers: {'Authorization': "Bearer "+localStorage.getItem('jwtToken')}}).then(function(){
            console.log("done")
            toast(`Report has been successfully stored`,{
                type: toast.TYPE.INFO,
                position: toast.POSITION.TOP_CENTER
            });
      
      
        }).catch(function(){
            toast(`Report failed to submit, check your connection and try again`,{
                type: toast.TYPE.ERROR,
                position: toast.POSITION.TOP_CENTER
            });
        })
        this.onExitClick()

    }

    render() {

        
        if(this.state.dataLoaded){

            var date = new Date()
            var dateFormatted = date.getHours+":"+date.getMinutes+":"+date.getSeconds+" GMT"
            
            var now = new Date();
            var todaysdate = now.getDate() + "-" + now.getMonth() + "-" + now.getFullYear()
            var time = now.getHours() + ":" + now.getMinutes() + ":" + now.getUTCSeconds()+ " GMT";
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
                                    <button className="btn-floating btn-large waves-effect " onClick={() => this.props.closeReportDialog()}><i className={"blue" + " material-icons"} style={{color:"white", fontSize: "45px"}}>arrow_back</i></button>
                                    </li>
                                </ul>
                                <div className={"blue" + " box"} style={{height: "20vh"}}/>

                                <span className="card-title" style={{color: "white", fontWeight:500, fontSize:"3.4rem"}}>Create Report</span>
                                </div>
                                <div className="card-content">
                                    </div>

                                    <div className="container">
                                        <table id="createReportTable">
                                            <thead>

                                            </thead>
                                            <tbody>
                                                {/* <tr><th rowSpan="1"><p style={{fontWeight:"bold", textAlign:"center"}}>{now.toUTCString()}</p></th></tr> */}
                                                <tr><th>Date</th>
                                                <td colSpan="2">
                                                <div className="input-field col s10">
                                                    <input id="report_date" type="text" className="validate disabled" defaultValue={todaysdate} disabled required />
                                                    <label htmlFor="report_date"></label>
                                                </div>
                                                </td></tr>
                                                <tr><th>Time</th>
                                                <td colSpan="2"><div className="input-field col s10">
                                                    <input id="report_time" type="text" className="validate disabled" defaultValue={time} disabled required/>
                                                    <label htmlFor="report_time"></label>
                                                </div></td></tr>
                                                <tr><th>Garda</th>
                                                <td colSpan="2"><div className="input-field col s10">
                                                    <input id="report_garda" type="text" className="validate disabled" defaultValue={localStorage.getItem('user_name')} disabled required/>
                                                    <label htmlFor="report_garda"></label>
                                                </div></td></tr>
                                                <tr><th>Crime ID</th>
                                                <td colSpan="2"><div className="input-field col s10">
                                                    <input id="report_crimeid" type="number" className="" defaultValue={this.props.crime_id} required/>
                                                    <label htmlFor="report_crimeid" className="active">Crime ID <small>(Optional)</small></label>
                                                </div></td></tr>
                                                <tr><th>Report</th>
                                                <td colSpan="2"><div className="input-field col s10">
                                                    <textarea id="report_content" className="validate" style={{height:200}}></textarea>
                                                    <label htmlFor="report_content" style={{marginLeft:5, marginBottom:5}}>Report Content</label>
                                                </div></td></tr>
                                                

                                            </tbody>
                                        </table>
                                    </div>
                                <div className="card-action" style={{paddingTop:"30px", paddingBottom: "30px"}}>
                                    <a href="#"  className="btn primary-background crime-card-button" style={{marginRight: 20}} onClick={() => this.createReport()}>Submit</a>
                                    <a href="#" className="btn red crime-card-button" onClick={() => this.props.closeReportDialog()}>Cancel</a>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }else{
            return (<div>CreateReport not loaded</div>);
        }
    }
}

export default CreateReport
