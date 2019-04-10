import React, { Component } from 'react';

export default class AuthButton extends Component {
  render(){
    //localStorage.jwtToken
    return <button onClick={this.props.onClick}>SESION</button>
  }
}