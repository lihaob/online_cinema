var base=require('./base');

function User(user){
    this.id = user.id;
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
    this.phone = user.phone;
    this.info = user.info;
    this.image = user.image;
    this.createTime = user.createTime;
    this.updateTime = user.updateTime;
}

User.prototype.save=function(callback){
    base.query("insert into users(username,password,email,phone,info,image) values(?,?,?,?,null,null)",
        [this.username,this.password,this.email,this.phone],function(err,res,fields){
            if(err){
                return callback(err,null);
            }
            callback(null,res.insertId);
        })
};

User.getUserByName=function(name,callback){
    base.query('select * from users where username=?',[name],function(error,results,fields){
        if(error){
            return callback(error,null);
        }else{
            callback(null,results);
        }
    })
};

User.getUserByPhone=function(phone,callback){
    base.query('select * from users where phone=?',[phone],function(error,results,fields){
        if(error){
            return callback(error,null);
        }else{
            callback(null,results);
        }
    })
};

User.getUserByEmail=function(email,callback){
    base.query('select * from users where email=?',[email],function(error,results,fields){
        if(error){
            return callback(error,null);
        }else{
            callback(null,results);
        }
    })
};

module.exports=User