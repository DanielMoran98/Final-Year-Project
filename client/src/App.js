import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './pages/login/Login';
import Map from './pages/map/Map';
import SideNav from './components/SideNav';

function App() {
  return (

    <div className="App">
    <div className="styles">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.css"/>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
    </div>

    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/Map" exact component={Map} />
    </Router>

      <div className="imports">
        <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.js"></script>
      </div>
    </div>
  );
}

export default App;
