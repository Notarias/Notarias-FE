import React, { Component } from 'react'

const style = {
  frontSize: '2em',
  fontWeight: 'normal',
  textAlign: 'left',
  paddingLeft: '5px',
}

export default class H2 extends Component {
  render() {
    return (
      <h2 {...this.props} style={style}></h2>
    )
  }
}
