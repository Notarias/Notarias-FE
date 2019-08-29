import React, { Component } from 'react';
import store                from '../../store';
import { setBreadcrumbsList } from './../Reducers/BreadcrumbsReducer';

class Home extends Component {
  componentDidMount() {
    store.dispatch(setBreadcrumbsList([]))
  }

  render() {
    return (
      <div>Home</div>
    );
  }
}

export default Home;