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

//如果插入成功，callback的res参数返回插入的行号
User.prototype.save=function(callback){
    base.query("insert into users(username,password,email,phone,info,image) values(?,?,?,?,null,null)",
        [this.username,this.password,this.email,this.phone],function(err,res,fields){
            if(err){
                return callback(err,null);
            }
            callback(null,res.insertId);
        })
};

//如果更新成功，callback的res参数返回更新的行数
User.prototype.updatePassword=function(callback){
    base.query("update users set password=? where id=?",[this.password,this.id],function(err,res,fields){
        if(err){
            return callback(err,null);
        }
        callback(null,res.changedRows);
    });
};

//如果更新成功，callback的res参数返回更新的行数
User.prototype.modifyUserInf=function(callback){
  base.query('update users set info=?,username=? where id=?',[this.info,this.username,this.id],function(err,res,fields){
      if(err){
          return callback(err,null);
      }
      callback(null,res.changedRows);
  });
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

module.exports=User;