var Favorites=require('../modules/favorites');
var CONST=require('../const')

//status:1 已收藏  status:0  未收藏

/*给定用户id和电影id，获知当前用户是否收藏了该电影 get
* @param movie_id
* @return status*/
exports.getStatus=function(req,res,next){
    var user_id=req.session.user.id,
        movie_id=req.param("movie_id");
    var favorites=new Favorites({
        users_id:user_id,
        movie_id:movie_id
    });
    favorites.find(function (error,result) {
        if(error){
            return res.json({
                status:CONST.ERROR.status,
                msg:CONST.ERROR.msg,
                result:CONST.ERROR.result
            });
        }else{
            return res.json({
                status:CONST.SUCCESS.status,
                msg:CONST.SUCCESS.msg,
                result:result
            })
        }
    });
};

/*切换收藏状态，如果原来未收藏，则改为收藏状态；若原来已收藏，则取消收藏 post
* @param movie_id*/
exports.switchStatus=function(req,res,next){
    var user_id=req.session.user.id,
        movie_id=req.body.movie_id;
    var favorites=new Favorites({
        users_id:user_id,
        movie_id:movie_id
    });
    favorites.find(function (error,result) {
        if(error){
            return res.json({
                status:CONST.ERROR.status,
                msg:CONST.ERROR.msg,
                result:CONST.ERROR.result
            });
        }else{
            var status=result;
            console.log(status)
            if(status==0){
                favorites.save(function (error,result) {
                    if(error){
                        return res.json({
                            status:CONST.ERROR.status,
                            msg:CONST.ERROR.msg,
                            result:CONST.ERROR.result
                        });
                    }else{
                        return res.json({
                            status:CONST.SUCCESS.status,
                            msg:CONST.SUCCESS.msg,
                            result:CONST.SUCCESS.result
                        })
                    }
                });
            }else{
                favorites.delete(function (error,result) {
                    if(error){
                        return res.json({
                            status:CONST.ERROR.status,
                            msg:CONST.ERROR.msg,
                            result:CONST.ERROR.result
                        });
                    }else{
                        return res.json({
                            status:CONST.SUCCESS.status,
                            msg:CONST.SUCCESS.msg,
                            result:CONST.SUCCESS.result
                        })
                    }
                });
            }
        }
    });
};