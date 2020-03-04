var User=require('../../modules/users')
// User.getUserByName('lhb',function(error,result,fields){
//     console.log(result);
// })
User.getUserByPhone('79887',function(error,result,fields){
    console.log(result);
})