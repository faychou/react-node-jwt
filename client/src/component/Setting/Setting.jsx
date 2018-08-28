import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Setting extends Component{
  render() {
    return (
      <div className="setting">
        <div>设置</div>
        <p>
          <Link to="/">Home</Link>
        </p>
      </div>
    )
  }
}