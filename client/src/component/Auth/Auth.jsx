/* 
  判断用户是否登录;
  在登录界面用到这个类，就是点击『登录』按钮之后，实例化这个类并调用Auth类中的login()方法
*/
import http from '../../util/http';

export  default class Auth{
  constructor() {
    this.isLogin = false; //是否登录
  }

  // 用户登录函数
  login(userName,userPass,callback) {
    let that = this;
    http.post('/login', {
      name: userName,
      pass: userPass
    })
    .then(function (response) {
      console.log(response);
      if (response.data.token) {
        localStorage.setItem('token',response.data.token);
        that.isLogin = true;
        callback(); //登录成功，调用回调函数
      } else {
        alert("登录失败");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  //退出登录
  signout(callback) {
    localStorage.removeItem('token');
    this.isLogin = false;
    callback();
  }
}