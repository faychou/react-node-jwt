import axios from 'axios';
// import { createBrowserHistory } from 'history';

// 创建历史对象
// const history = createBrowserHistory();

// 添加一个新的axios实例
var http = axios.create({
  // baseURL: url,
  /* headers: {
    'Content-Type': 'application/json; charset=utf-8'
  } */
})

//拦截请求，给所有的请求都带上 token
http.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    console.log('请求拦截中获取token：',token);
    if (token) {
      // 这里将 token 设置到 headers 中，request.headers['Authorization']必须通过此种形式设置
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    console.log('请求拦截错误：',error);
    return Promise.reject(error);
});

// 拦截响应，遇到 token 不合法则报错
http.interceptors.response.use(
  response => {
    if (response.data.token) {
      console.log('拦截到响应的token:', response.data.token);
      localStorage.setItem('token', response.data.token);
    }
    return response;
  },
  error => {
    if (error.response.status === 401) {
      // 401 说明 token 验证失败
      // 可以直接跳转到登录页面，重新登录获取 token
      localStorage.removeItem('token');
      alert('Auth Error!please login!');
      console.log(error.response.data.error.message);
      window.location.replace('/login');
    } else if(error.response.status === 500) {
      // 服务器错误
      return Promise.reject('服务器出错：',error.response.data);
    }
    return Promise.reject(error.response.data);   // 返回接口返回的错误信息
  });

  export default http;

  /* export default class http {
    static get(url, params) {
      return new Promise((resolve, reject) => {
        axios.get(url, {
          params: params
        }).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      });
    }
  
    static post(url, body) {
      return new Promise((resolve, reject) => {
        axios.post(url, body)
          .then(res => {
            resolve(res);
          }).catch(err => {
            reject(err);
          });
      });
    }
  } */