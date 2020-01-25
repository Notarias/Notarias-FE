import React, { Component } from 'react';
import { setBreadcrumbsList } from './../../interfaces/breadcrumbs_interface';

class DashboardsIndex extends Component {
  componentDidMount() {
    setBreadcrumbsList([])
  }

  render() {
    return (
      <div>Home</div>
    );
  }
}

export default DashboardsIndex;