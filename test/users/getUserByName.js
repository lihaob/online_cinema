var User=require('../../modules/users')
User.getUserByName('lhb',function(error,result,fields){
    console.log(result);
})
