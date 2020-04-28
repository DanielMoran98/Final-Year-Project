import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './SideNav.css'
// import './CreateCrime.css'
import GoogleMapReact from 'google-map-react'
import GoogleMap from './GoogleMap.js'
import CreateReport from './CreateReport'

import Marker from './Marker.js'
import M from 'materialize-css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const axios = require('axios');



  

export class ReportSnippet extends Component {
    static defaultProps = {

      };
    state = {
        dataLoaded:false
        ,dateFormatted: "12am"
    }

  
    componentDidMount(){
        var date = new Date(this.props.datetime)
        var dateFormatted = JSON.stringify(date.getHours+":"+date.getMinutes+":"+date.getSeconds+" GMT")
        
        // var now = new Date();
        // var todaysdate = now.getDate() + "-" + now.getMonth() + "-" + now.getFullYear()
        // var time = now.getHours() + ":" + now.getMinutes() + ":" + now.getUTCSeconds()+ " GMT";
        this.setState({dateFormatted:dateFormatted}, ()=> {this.setState({dataLoaded: true})})
    }





    render() {
        if(this.state.dataLoaded){
            return (
                <table className="showReportTable" style={{overflow:"hidden", tableLayout:"fixed"}}>
                    <thead></thead>
                    <tbody style={{height: "auto"}}>
                        <tr><th colSpan="3"> <h4 style={{textAlign:"center", paddingTop:55}}>Report #{this.props.id}</h4></th></tr>
                        <tr><th colSpan="1">Date/Time</th>
                        <td colSpan="2"><div className="input-field col s10">
                            <p className="report_time">
                                {this.props.datetime}
                            </p>
                        </div></td></tr>
                        <tr><th colSpan="1">Crime</th>
                        <td colSpan="2"><div className="input-field col s10">
                            <p className="report_crime"> {this.props.crime ? this.props.crime : "No specific crime specified"}</p>
                            <label htmlFor="report_time"></label>
                        </div></td></tr>
                        <tr><th colSpan="1">Content</th>
                        <td colSpan="2"><div className="input-field col s10">
                            <p className="report_content">{this.props.content ? this.props.content : "No content provided"}</p>
                            <label htmlFor="report_time"></label>
                        </div></td></tr>
                    </tbody>
                </table>
                    
            )
        }else{
            return "Loading"
        }
        

    }
}

export default ReportSnippet
