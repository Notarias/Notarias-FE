import React, { Component } from 'react'

const style = {
  fontWeight: 'normal',
  margin: '0px',
  textAlign: 'left',  
}

export default class H3 extends Component {
  render() {
    return (
      <h3 {...this.props} style={style}></h3>
    )
  }
}
