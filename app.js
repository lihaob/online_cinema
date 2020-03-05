//external
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session=require('express-session');
var bodyParser=require('body-parser');
var CONST=require('./const')

//自定义模块
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
//这里有坑，下面两行必须在下面第三行之前，express的bug
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

//拦截器
app.use(function(req,res,next){
  if(req.session.user){
    next();
  }else{
    //暴露的接口
    if(req.originalUrl=='/users/loginByPhone'||req.originalUrl=='/users/loginByEmail'
        ||req.originalUrl=='/users/logout'||req.originalUrl=='/users/captcha'||req.originalUrl=='/users/register'){
      next();
    }else{
      res.json({
        status:CONST.PERMISSION_DENIED.status,
        msg:CONST.PERMISSION_DENIED.msg,
        result:CONST.PERMISSION_DENIED.result
      });
    }
  }
});

//配置路由
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
var svgCaptcha = require('svg-captcha');


module.exports = app;
