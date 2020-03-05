/*
* 配置属性
*/

var path=require('path');

module.exports={
    /*mysql数据库的配置*/
    host : 'localhost',
    databaseName : 'online_cinema',
    userName : 'rjgc',
    password : 'rjgc123',

    /*对称加密密钥*/
    secret:"hello world",

    /*formidable中间件*/
    uploadDir:path.join(__dirname,'upload'),//上传路径
    keepExtensions:true,//是否包括后缀名
    multiples:true,//是否可以同时上传多个文件
};