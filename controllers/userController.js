var CONST=require('../const');
var User=require('../modules/users');
var UsersLog=require('../modules/usersLog')
var CryptoJS=require('crypto-js');
var conf=require('../configurations');
var utils=require('../utils/utils')

var secret=conf.secret;//获取密钥

/*用户注册：post接口
 *  */
exports.register=function(req,res,next){
    var username=req.body.username;
    var pwd1=req.body.pwd1;
    var pwd2=req.body.pwd2;
    var email=req.body.email;
    var phone=req.body.phone;
    var captcha=req.body.captcha.trim();//用户输入的验证码
    var captcha_=req.session.captcha.trim();//captcha将验证码的值写入session保存

    //手机和邮箱不能为空
    if(!email||!phone){
        res.json({
            status:CONST.PARAM_ERROR.status,
            msg:CONST.PARAM_ERROR.msg,
            result:CONST.PARAM_ERROR.result
        });
        return;
    }

    //判断两次输入的密码是否一致
    if(pwd1&&pwd2&&pwd1!=pwd2){
        res.json({
            status:CONST.PASSWORD_ERROR.status,
            msg:CONST.PASSWORD_ERROR.msg,
            result:CONST.PASSWORD_ERROR.result
        });
        return;
    }

    //校验验证码
    if(!captcha||!captcha_||(captcha.toLowerCase()!==captcha_.toLowerCase())){
        res.json({
            status:CONST.CAPTCHA_ERROR.status,
            msg:CONST.CAPTCHA_ERROR.msg,
            result:CONST.CAPTCHA_ERROR.result
        });
        return;
    }

    //判断手机号和email是否已经被注册
    User.getUserByPhone(phone,function(error,result){
        if(error){
            return res.json({
                status:CONST.ERROR.status,
                msg:CONST.ERROR.msg,
                result:CONST.ERROR.result
            });
        }else if(result.length>0){
            return res.json({
                status:CONST.PHONE_EXIST.status,
                msg:CONST.PHONE_EXIST.msg,
                result:CONST.PHONE_EXIST.result
            });
        } else{
            User.getUserByEmail(email,function(error,result){
                if(error){
                    return res.json({
                        status:CONST.ERROR.status,
                        msg:CONST.ERROR.msg,
                        result:CONST.ERROR.result
                    });
                }else if(result.length>0){
                    return res.json({
                        status:CONST.EMAIL_EXIST.status,
                        msg:CONST.EMAIL_EXIST.msg,
                        result:CONST.EMAIL_EXIST.result
                    });
                } else{
                    //注册用户
                    //先md5非对称加密后再aes对称加密
                    var tempPwd=CryptoJS.MD5(pwd1).toString();
                    //console.log(tempPwd)
                    var pwd=CryptoJS.AES.encrypt(tempPwd,secret).toString();
                    //console.log(pwd)
                    var user=new User({
                        username:username,
                        password:pwd,
                        email:email,
                        phone:phone
                    });
                    user.save(function(error,result){
                        if(error){
                            next(error);
                        }
                        if(result.insertId==0){
                            return res.json({
                                status:CONST.INSERT_ERROR.status,
                                msg:CONST.INSERT_ERROR.msg,
                                result:CONST.INSERT_ERROR.result
                            });
                        }else{
                            return res.json({
                                status:CONST.SUCCESS.status,
                                msg:CONST.SUCCESS.msg,
                                result:CONST.SUCCESS.result
                            });
                        }
                    });
                }
            });
        }
    });
};

/*通过手机号登录：post
* @param phone
* @param password
* @param captcha*/
exports.loginByPhone=function(req,res,next){
    var phone=req.body.phone,
        password=req.body.password,
        captcha=req.body.captcha,
        captcha_=req.session.captcha;

    //参数校验，目前先简单判断是否为空，之后有空再写校验器
    if(!phone||!password||!captcha){
        return res.json({
           status:CONST.PARAM_ERROR.status,
           msg:CONST.PARAM_ERROR.msg,
           result:CONST.PARAM_ERROR.result
        });
    }

    //校验验证码
    if(!captcha||!captcha_||(captcha.toLowerCase()!==captcha_.toLowerCase())){
        return res.json({
            status:CONST.CAPTCHA_ERROR.status,
            msg:CONST.CAPTCHA_ERROR.msg,
            result:CONST.CAPTCHA_ERROR.result
        });
    }

    //根据phone获取用户信息
    User.getUserByPhone(phone,function(error,result){
        if(error){
            return res.json({
                status:CONST.ERROR.status,
                msg:CONST.ERROR.msg,
                result:CONST.ERROR.result
            });
        }
        if(result.length===0){
            return res.json({
                status:CONST.ERROR.status,
                msg:CONST.ERROR.msg,
                result:CONST.ERROR.result
            });
        }else{
            //判断密码是否匹配
            //先aes解密，后md5解密
            var tempPwd1=CryptoJS.AES.decrypt(result[0].password,secret);//数据库中的密码用aes解码，获得的字符串仍md5加密，而md5不可逆
            var tempPwd2=CryptoJS.MD5(password).toString();//对req传过来的密码进行md5加密
            tempPwd1=tempPwd1.toString(CryptoJS.enc.Utf8);
            console.log(tempPwd1,tempPwd2);
            if(tempPwd1===tempPwd2){
                //登录操作
                //写入session
                req.session.user=result[0];

                //获取ip，再使用百度api获取地址
                var ip = req.headers['x-forwarded-for'] ||
                    req.ip ||
                    req.connection.remoteAddress ||
                    req.socket.remoteAddress ||
                    req.connection.socket.remoteAddress || '';
                if(ip.split(',').length>0){
                    ip = ip.split(',')[0]
                }
                ip = ip.substr(ip.lastIndexOf(':')+1,ip.length);
                var city='unknown city';
                utils.getIpInfo(ip,function(error,msg){
                    //如果ip是localhost，将查不到数据，此时msg.data为空
                    if(!msg.data.length==0){
                        city=msg.data[0].location;
                    }
                    var usersLog=new UsersLog({
                        city:city,
                        ip:ip,
                        users_id:result[0].id
                    });
                    usersLog.save(function(err,res){
                        if(err){
                            next(err);
                        }
                    });
                });
                res.json({
                    status:CONST.LOGIN_SUCCESS.status,
                    msg:CONST.LOGIN_SUCCESS.msg,
                    result:CONST.LOGIN_SUCCESS.result
                })
            }else{
                return res.json({
                    status:CONST.LOGIN_ERROR.status,
                    msg:CONST.LOGIN_ERROR.msg,
                    result:CONST.LOGIN_ERROR.result
                });
            }
        }
    });
};

/*通过邮箱登录：post
* @param email
* @param password*/
exports.loginByEmail=function(req,res,next){
    var email=req.body.email,
        password=req.body.password,
        captcha=req.body.captcha,
        captcha_=req.session.captcha;

    //参数校验，目前先简单判断是否为空，之后有空再写校验器
    if(!email||!password||!captcha){
        return res.json({
            status:CONST.PARAM_ERROR.status,
            msg:CONST.PARAM_ERROR.msg,
            result:CONST.PARAM_ERROR.result
        });
    }

    //校验验证码
    if(!captcha||!captcha_||(captcha.toLowerCase()!==captcha_.toLowerCase())){
        return res.json({
            status:CONST.CAPTCHA_ERROR.status,
            msg:CONST.CAPTCHA_ERROR.msg,
            result:CONST.CAPTCHA_ERROR.result
        });
    }

    //email
    User.getUserByEmail(email,function(error,result){
        if(error){
            return res.json({
                status:CONST.ERROR.status,
                msg:CONST.ERROR.msg,
                result:CONST.ERROR.result
            });
        }
        if(result.length===0){
            return res.json({
                status:CONST.ERROR.status,
                msg:CONST.ERROR.msg,
                result:CONST.ERROR.result
            });
        }else{
            //判断密码是否匹配
            //先aes解密，后md5解密
            var tempPwd1=CryptoJS.AES.decrypt(result[0].password,secret);//数据库中的密码用aes解码，获得的字符串仍md5加密，而md5不可逆
            var tempPwd2=CryptoJS.MD5(password).toString();//对req传过来的密码进行md5加密
            tempPwd1=tempPwd1.toString(CryptoJS.enc.Utf8);
            console.log(tempPwd1,tempPwd2);
            if(tempPwd1===tempPwd2){
                //登录操作
                //写入session
                req.session.user=result[0];

                //获取ip，再使用百度api获取地址
                var ip = req.headers['x-forwarded-for'] ||
                    req.ip ||
                    req.connection.remoteAddress ||
                    req.socket.remoteAddress ||
                    req.connection.socket.remoteAddress || '';
                if(ip.split(',').length>0){
                    ip = ip.split(',')[0]
                }
                ip = ip.substr(ip.lastIndexOf(':')+1,ip.length);
                var city='unknown city';
                utils.getIpInfo(ip,function(error,msg){
                    //如果ip是localhost，将查不到数据，此时msg.data为空
                    if(!msg.data.length==0){
                        city=msg.data[0].location;
                    }
                    var usersLog=new UsersLog({
                        city:city,
                        ip:ip,
                        users_id:result[0].id
                    });
                    usersLog.save(function(err,res){
                        if(err){
                            next(err);
                        }
                    });
                });
                res.json({
                    status:CONST.LOGIN_SUCCESS.status,
                    msg:CONST.LOGIN_SUCCESS.msg,
                    result:CONST.LOGIN_SUCCESS.result
                })
            }else{
                return res.json({
                    status:CONST.LOGIN_ERROR.status,
                    msg:CONST.LOGIN_ERROR.msg,
                    result:CONST.LOGIN_ERROR.result
                });
            }
        }
    });
};

/*登出功能：get*/
exports.logout=function(req,res,next){
    if(req.session.user==undefined){
        return res.json({
            status:CONST.LOGOUT_ERROR.status,
            msg:CONST.LOGOUT_ERROR.msg,
            result:CONST.LOGOUT_ERROR.result
        });
    };
    req.session.user=null;
    res.json({
        status:CONST.LOGOUT_SUCCESS.status,
        msg:CONST.LOGOUT_SUCCESS.msg,
        result:CONST.LOGOUT_SUCCESS.result
    });
}

