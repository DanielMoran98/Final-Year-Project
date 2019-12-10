import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './pages/login/login';
function App() {
  return (
    <div className="App">
    <Router>
      <Route path="/" component={Login} />
    </Router>
    </div>
  );
}

export default App;
