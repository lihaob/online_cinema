var utils=require('../../utils/utils')
var city='unknown';
utils.getIpInfo('127.0.0.1',function(error,msg){
    if(error){
        console.log(error)
        return 'unknown city';
    }
    if(msg.data.length==0){
        return 'unknown city';
    }
    console.log(msg);
});
