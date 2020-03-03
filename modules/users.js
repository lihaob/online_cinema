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

User.getUserByName=function(name,callback){
    base.query('select * from users',function(error,results){
        if(error){
            return callback(error,null,null);
        }else{
            callback(null,results);
        }
    })
};

module.exports=User