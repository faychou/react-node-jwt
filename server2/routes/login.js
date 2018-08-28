const express = require('express');
const jwt = require('jsonwebtoken'); // 引入 jsonwebtoken
const util = require('../util/util');
const router = express.Router();

//模拟用户数据
let user = {
  name:'admin',
  pass:'123',
  role:0
};

/* GET 测试 */
router.get('/',function(req,res) {
  res.json({msg:'get请求不到登陆的'});
});

router.post('/', function(req, res) {
  console.log('拿到请求数据：',req.body);
  if(req.body.name === user.name && req.body.pass === user.pass) {
    console.log('服务器账号验证正确。');

    const token = jwt.sign({
      userName: req.body.name
    }, util.secretOrPrivateKey , { // 秘钥
        expiresIn: 60 * 2 // 过期时间
    });
    
    console.log('服务器端已经生成token。');

    res.json({
      msg:'登陆成功',
      token:token
    });
  } else {
    res.json({
      msg:'登录失败'
    });
  }
});

module.exports = router;