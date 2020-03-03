var CONST=require('../const')
/*post接口
 *  */
exports.register=function(res,req,next){
    var userName=req.body.userName
    var pwd1=req.body.pwd1
    var pwd2=req.body.pwd2;
    var email=req.body.email;
    var phone=req.body.phone;

    //判断两次输入的密码是否一致
    if(pwd1!=pwd2){
        res.json({
            status:CONST.SUCCESS.status,
            msg:CONST.SUCCESS.msg,
            result:CONST.SUCCESS.result
        });
        return;
    }

    //校验验证码
    TODO
    //判断手机号和email是否已经被注册

};