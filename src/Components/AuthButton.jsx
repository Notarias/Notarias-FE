import React, { Component } from 'react';

export default class AuthButton extends Component {

  handleClick = () => {
    if (localStorage.session) {
      localStorage.setItem('session', false)
    } else {
      localStorage.setItem('session', true)
    }
  }

  render(){
    //localStorage.jwtToken
    return <button onClick={this.handleClick}>SESION</button>
  }
}