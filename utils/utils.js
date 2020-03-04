var http = require('http');
var util = require('util');

/*找了很多接口都要key，就这个不用。。缺点是如果ip在统一局域网内会显示本地局域网。。*/
exports.getIpInfo = function(ip, cb) {
    var url="http://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php?query="+ip+"&co=&resource_id=6006&t=1555898284898&ie=utf8&oe=utf8&format=json&tn=baidu";
    http.get(url, function(res) {
        var code = res.statusCode;
        if (code == 200) {
            res.on('data', function(data) {
                try {
                    cb(null, JSON.parse(data));
                } catch (err) {
                    cb(err);
                }
            });
        } else {
            cb({ code: code });
        }
    }).on('error', function(e) { cb(e); });
};