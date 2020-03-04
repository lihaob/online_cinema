var express = require('express');
var svgCaptcha = require('svg-captcha');
var router = express.Router();

const userController=require('../controllers/userController')

/* 二级路由*/
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/*获取验证码图片*/
router.get('/captcha', function (req, res) {
  var captcha = svgCaptcha.create();
  req.session.captcha = captcha.text;
  res.type('svg');
  res.status(200).send(captcha.data);
});

/*用户注册
* @param userName
* @param pwd1
* @param pwd2
* @param email
* @param phone*/
router.post('/register',userController.register);

router.post('/loginByPhone',userController.loginByPhone);
module.exports = router;
