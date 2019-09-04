import React, { Component } from 'react';
import { setBreadcrumbsList } from './../Interfaces/BreadcrumbsSi';

class Home extends Component {
  componentDidMount() {
    setBreadcrumbsList([])
  }

  render() {
    return (
      <div>Home</div>
    );
  }
}

export default Home;