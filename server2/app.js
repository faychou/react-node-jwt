const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

const routes = require('./routes/index');

const app = express();

// 模版引擎配置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 每一次服务请求都会将信息打印在控制台中
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//静态资源
app.use(express.static(path.join(__dirname, 'public')));

// 路由引入
routes(app); 

module.exports = app;
