import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import http from '../../util/http';
import './home.css';

export default class Home extends Component{
  constructor() {
    super()
    this.state = {
      datas:[]
    }
  }
  componentDidMount() {
    let that = this;
    http.get('/list')
    .then(response => {
      const datas = response.data.datas;
      that.setState({
        datas
      })
    })
    .catch((err) => {
      console.log(err);
    });
  }
  render() {
    const { datas } = this.state;
    console.log('渲染时获取数据：',datas);
    return (
      <div className="home">
        <h2>Home</h2>
        <div>
          <Link to="/setting">设置</Link>
        </div>
        <ul className="home-list">
          {datas.map((item,i) => {
            return (
              <li key={i}>{item.title}：{item.body}</li>
            )
          })}
        </ul>
      </div>
    )
  }
}