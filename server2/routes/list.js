var express = require('express');
var router = express.Router();

//模拟数据
var datas = [{
    title:'第一篇',
    body:'第一篇的内容'
  },{
    title:'第二篇',
    body:'第二篇的内容'
  },{
    title:'第三篇',
    body:'第三篇的内容'
  }];

/* GET  */
router.get('/', function(req, res) {
  console.log('res.header',res.header);
  console.log('res.headers',res.headers);
  res.json({datas:datas});
});

module.exports = router;
