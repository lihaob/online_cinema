var conf=require('../configurations');//加载数据库配置
var mysql=require('mysql');

//连接池
var pool = mysql.createPool({
    connectionLimit:100,
    host     : conf.host,
    user     : conf.userName,
    password : conf.password,
    database :  conf.databaseName
});

exports.query=function(sql,...args){
    if(args.length==2&&Array.isArray(args[0])&&Object.prototype.toString.call(args[1]) === '[object Function]'){
        /*三个参数
        * @param sql
        * @param param：array
        * @param callback：function
        * caution：sql中占位符与param中的参数顺序相同
        * */
        pool.getConnection(function(err, connection) {
            if (err) throw new Error('not connected'); // not connected!
            // Use the connection
            //对sql语句进行转义，防止攻击
            connection.query(sql,args[0],function (error, results) {
                // When done with the connection, release it.
                connection.release();
                args[1](arguments);
                // Handle error after the release.
                if (err) throw new Error('query failed');
                // Don't use the connection here, it has been returned to the pool.
            });
        });
    }else if(args.length==1&&Object.prototype.toString.call(args[0]) === '[object Function]'){
        /*不带参数的sql语句执行
        * @param sql
        * @param callback
        * */
        pool.getConnection(function(err, connection) {
            if (err) throw new Error('not connected'); // not connected!
            // Use the connection
            //对sql语句进行转义，防止攻击
            connection.query(sql,function (error, results) {
                // When done with the connection, release it.
                connection.release();
                args[0](arguments);
                // Handle error after the release.
                if (err) throw new Error('query failed');
                // Don't use the connection here, it has been returned to the pool.
            });
        });
    }else{
        throw new Error('base.js:query:参数不匹配');
    }
}
