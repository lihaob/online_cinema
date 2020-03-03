var User=require('../../modules/users')
User.getUserByName('lhb',function(result,fields){
    console.log(result[1]);
})
