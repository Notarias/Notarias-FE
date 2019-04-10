import React, { Component } from 'react';
import AuthButton from './Components/AuthButton';
import './App.css';
import BaseRoutes from './Routes/BaseRoutes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AuthButton/>
        
        <BaseRoutes/>
      </div>
    );
  }
}

export default App;
