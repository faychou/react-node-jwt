const expressJWT = require('express-jwt');
const util = require('../util/util');

module.exports = (app) => {
  //CORS
  /* app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With');
    res.header('Access-Control-Allow-Credentials', 'true');//和客户端对应，必须设置以后，才能接收cookie.
    next();
  }); */

  //设置需要保护的 API
  app.use(expressJWT({
    secret: util.secretOrPrivateKey   
  }).unless({
    path: ['/login']  //除了这个地址，其他的URL都需要验证
  }));

  app.get('/', (req, res) => {
    res.render('index', { title: 'Express' });
  });

  app.use('/login', require('./login'));
  app.use('/list', require('./list'));

  // 404
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // 5xx 错误
  app.use(function(err, req, res, next) {
    //校验 token 失败时的处理
    if (err.name === 'UnauthorizedError') {   
      // 这个需要根据自己的业务逻辑来处理
      res.status(401).json({
        message: 'invalid token',
        error: err
      });
      return;
    }

    // 仅在开发环境错误提示
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500).json({msg:'error'});
  });
};
