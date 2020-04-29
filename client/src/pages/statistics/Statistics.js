import React, {Component} from 'react';
import ReactDOM from 'react-dom';
// import './Map.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GoogleMap from '../../components/GoogleMap';
import SideNav from "../../components/SideNav";
import CreateCrime from '../../components/CreateCrime';
import CreateReport from '../../components/CreateReport';
import addNotification from 'react-push-notification';
import GoogleMapReact from 'google-map-react';

const axios = require('axios');

class Statistics extends Component {
    static defaultProps = {
        center: {
          lat: 53.35,
          lng: -6.26
        },
        zoom: 13,
        height: "100vh",
      };
      
      state = {
        positions: [
        ],
      };


      async componentDidMount(){
        try {
          // Retrieve and save to state all crime entries for the last month
          const response = await axios.post('/api/crime/all/lastmonth', {}, {headers: {'Authorization': "Bearer "+localStorage.getItem('jwtToken')}});
          var data = response.data
    
          //Create a copy of the current positions array
          var newPositions = []
          for(var i = 0; i < data.length ; i++){
    
            var position = {
                // id: data[i].id,
                lat: data[i].latitude,
                lng: data[i].longitude,
            }
            //Push each object to the array
            newPositions.push(position);
          }
    
          // If there are no active crimes, set noCrimes to true
          if(newPositions.length == 0){this.setState({noCrimes: true})}
    
          // Update the state with the new array
          this.setState({positions: newPositions});
    
        } catch (error) {
          if(this.state.errorDisplayed == false){
          this.setState({errorDisplayed: true})
          console.error(error);
          toast(`Failed to connect to the server. Check your connection and try again.`,{
            type: toast.TYPE.ERROR,
            position: toast.POSITION.TOP_CENTER
          });
          setTimeout(()=>window.location.replace("/"), 5000)
          // window.location.replace("/");
         }
        }
      }
    
    goBack(){
        window.location.replace("/map")
    }



 
 


  render(){
    
    if(this.state.positions.length > 0){

        return (
        
        <div id="statisticPageContainer">
            <button style={{position:"fixed", top: 50, left: 35}} className="btn-floating btn-large waves-effect " onClick={() => this.goBack()}><i className={"blue" + " material-icons"} style={{color:"white", fontSize: "45px"}}>arrow_back</i></button>

            <div style={{ height: this.props.height, width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyA7qsNPuWR4K4RncWMv1sFfxUIJG-7zOh0" }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    onClick = {this.props.onClick}
                    heatmapLibrary={true}          
                    heatmap={{
                        positions: this.state.positions,
                        options: {radius:80, opacity:0.45}
                    }
                    }  
                    options={
                    {    
                        disableDefaultUI: true,
                        gestureHandling:"greedy",
                        clickableIcons: false
                    }
                    }  
                ></GoogleMapReact>
            </div>


            <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.js"></script>
        </div>

      );




   
    }else{
        return "Loading..."
    }
    }
}

export default Statistics;
