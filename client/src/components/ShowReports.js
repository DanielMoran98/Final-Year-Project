import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './SideNav.css'
import './CreateCrime.css'
import GoogleMapReact from 'google-map-react'
import GoogleMap from './GoogleMap.js'
import CreateReport from './CreateReport'
import ReportSnippet from './ReportSnippet'
import Marker from './Marker.js'
import M from 'materialize-css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const axios = require('axios');



  

export class ShowReports extends Component {
    static defaultProps = {

      };
      state={
          dataLoaded:false
      }


    async componentDidMount(){
        // Retrieve the reports, and store them in React state
        var data = {
            staff_id: this.props.staff_id
        }

        const response = await axios.post('/api/report/filterByStaff', data , {headers: {'Authorization': "Bearer "+localStorage.getItem('jwtToken')}}).then((response) =>{
            console.log("done")
            console.log(response)

            //Create a copy of the current reports array
            var newReports = []
            for(var i = 0; i < response.data.length ; i++){
            // For all active crimes
                var report = {
                    id: response.data[i].id,
                    datetime: response.data[i].datetime,
                    crime_id: response.data[i].crime_id,
                    content: response.data[i].content,
                }
                //Push each object to the array
                newReports.push(report);
            }
      
            // Store whether or not results were found
            if(newReports.length == 0){this.setState({noReports: true})}
            this.setState({reports: newReports}, () => {
                this.setState({dataLoaded: true})
            });
            console.log(this.state.reports[1])

        }).catch((err) => {
            if(err){console.log(err)}
            toast(`Failed to contact server`,{
                type: toast.TYPE.ERROR,
                position: toast.POSITION.TOP_CENTER
            });
        })

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
                            <div className="card z-depth-5" style={{height:"90vh", overflow:"none"}} >
                                <div className="card-image" style={{height: "20%"}}>
                                <ul style={{position: "absolute", zIndex: "5", left: "15px"}}>
                                    <li>
                                    <button className="btn-floating btn-large waves-effect " onClick={() => this.props.closeShowReportsDialog()}><i className={"blue" + " material-icons"} style={{color:"white", fontSize: "45px"}}>arrow_back</i></button>
                                    </li>
                                </ul>
                                <div className={"blue" + " box"} style={{height: "20vh", zIndex:500}}/>

                                <span className="card-title" style={{color: "white", fontWeight:500, fontSize:"3.4rem"}}>My Reports</span>
                                </div>


                                    <div className="container" style={{marginTop:18, height:"60vh", overflowY:"scroll"}}>

                                            { this.state.reports.length == 0 ?
                                            <h4>You have no reports</h4>
                                            :
                                            <div></div>
                                            }
                                            {this.state.reports.map(i => {
                                                
                                                return <ReportSnippet key= {i.id} id={i.id} datetime= {i.datetime} crime={i.crime_id} content={i.content}/>
                                            })}
    

                                        
                                    </div>
                                <div className="card-action" style={{paddingTop:"30px", paddingBottom: "30px"}}>
                                    <a href="#" className="btn red crime-card-button" onClick={() => this.props.closeShowReportsDialog()}>Exit</a>
                                </div>
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

export default ShowReports
