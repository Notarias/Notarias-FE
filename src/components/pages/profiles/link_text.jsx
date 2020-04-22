import React, { Component } from 'react'

const style = {
  div: {
     width:'80%',
     margin: '8px',
  },
  aLink: {
    frontSize: '2em',
    frontColor: 'blue',
  },
}

function changeBackground(e) {
  e.target.style.background = '#F0F8FF'
}

export default class LinkText extends Component {
  render() {
    return (
      <div onMouseOver={changeBackground} style={style.div}>
        <a {...this.props} style={style.aLink}></a><br/>
      </div>
    )
  }
}
