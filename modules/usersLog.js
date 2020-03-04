var base=require('./base');

function UsersLog(usersLog){
    this.id = usersLog.id;
    this.login_time=usersLog.login_time;
    this.ip=usersLog.ip;
    this.city=usersLog.city;
    this.users_id=usersLog.users_id;
}

/*保存用户登入日志*/
UsersLog.prototype.save=function(callback){
    base.query('insert into userslog(ip,city,users_id) values(?,?,?)',[this.ip,this.city,this.users_id],function(error,results,fields){
       if(error){
           return callback(error,null);
       }else{
           return callback(null,results);
       }
    });
};

module.exports=UsersLog;