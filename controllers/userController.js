var CONST=require('../const');
var User=require('../modules/users');
var CryptoJS=require('crypto-js');
var conf=require('../configurations');

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