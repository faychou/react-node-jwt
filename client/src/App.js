import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import './App.css';

import Auth from "./component/Auth/Auth";

import Home from './component/Home/Home';
import Login from './component/Login/Login';
import Setting from './component/Setting/Setting';

let  auth = new Auth(); // 初始化一个全局的 Auth 对象

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            {/* 判断用户是否登录，登录正常跳转，未登录就重定向到登录界面 */}
            {/* 
              如果使用 render 来加载组件而非 component 的话，就必须将 props 作为参数传递进去，否则子组件不能通过 this.props.xxxxx 拿到属性。
            */}
            <Route exact path="/" render={(props) => {
              if (auth.isLogin) {
                return <Home {...props} />
              } else {
                return <Redirect to='/login' />
              }
            }} />
            <Route path="/setting" render={(props) => {
              if(auth.isLogin) {
                return <Setting {...props} />
              } else {
                return <Redirect to={{
                  pathname:'/login',
                  state: { from: props.location }
                }} />
              }
            }}></Route>
            <Route path="/login" render={(props) => {
              return <Login auth={auth} {...props} />
            }} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
