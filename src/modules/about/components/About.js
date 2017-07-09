import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import '../about.css'

export default class About extends Component {
  render() {

    return (
      <div className="main">
        <div className="header">
          <h1>Currency  converter</h1>
        </div>
        <div className="profile">
          <div className="profile-item">
            <FontAwesome
              name='user'
              style={{ width: '30px', color: '#696969' }}
            />
            <div>Luan Nguyen</div>
          </div>
          <div className="profile-item">
            <FontAwesome
              name='envelope'
              style={{ width: '30px', color: '#696969' }}
            />
            <div>luannguyenbkit@gmail.com</div>
          </div>
        </div>
      </div>
    )
  }
}
