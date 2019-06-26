import React, { Component } from 'react';
import Button               from '@material-ui/core/Button';
import { Link }             from 'react-router-dom';

export default class ErrorNotFound extends Component {
 

  handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }
    render() {
        return (
            <div>
                <h1>Oops! Esa página no se puede encontrar.</h1>
                <p>
                  Parece que no se encontró nada en esta ubicación.
                  Use el boton rojo de abajo o presione Atrás para ir a la página anterior.
                </p>
                <a href="/" onClick={this.handleClick}>
                  Click me
                </a>
            </div>
        );
    }
}