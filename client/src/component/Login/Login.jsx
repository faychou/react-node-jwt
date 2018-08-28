import React, { Component } from 'react';
import Auth from "../Auth/Auth";
import './login.css';

export default class Login extends Component{
  constructor(props) {
    super(props);
    this.state = {
      userName:"",
      userPass:""
    };
    this.toLogin = this.toLogin.bind(this);
    this.setUserInfo = this.setUserInfo.bind(this);
  }
  setUserInfo(event, key) {
    let obj = {};
    obj[key] = event.target.value;

    this.setState(obj);
  }
  // 登陆
  toLogin() {
    //获取从哪个页面跳转到登陆页
    const { from } = this.props.location.state || { from: { pathname: "/" } };

    // 实例化这个类并调用 Auth 类中的 login() 方法
    let auth = this.props.auth == null ? new Auth() : this.props.auth;
    auth.login(this.state.userName,this.state.userPass,() => {
      this.props.history.push(from);
    });
  }
  render() {
    return (
      <div className="login">
        <div className="form-group">
          <input type="text" placeholder="请输入用户名" onChange={(e)=>{
            this.setUserInfo(e,"userName")
          }} />
        </div>
        <div className="form-group">
          <input type="password" placeholder="请输入密码"  onChange={(e)=>{
            this.setUserInfo(e,"userPass")
          }} />
        </div>
        <div className="form-group">
          <input type="button" value="登陆" onClick={this.toLogin}/>
        </div>
      </div>
    )
  }
}