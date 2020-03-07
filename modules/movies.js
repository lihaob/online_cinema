/*电影model分为两部分，movies和moviesDetail，前者用于电影列表的展示，只需最基本的信息，后者用于进入播放页面后，需要展示详细的电影信息*/
var base=require('./base')
function Movie(movie){
    this.id=movie.id;
    this.mv_name=movie.mv_name;
    this.mv_duration=movie.mv_duration;
    this.mv_img=movie.mv_img;
    this.mv_score=movie.mv_score;
}

/* 通过电影名称获取Url
* @param mv_name
* @return Movie*/
Movie.prototype.getUrlByName=function(mv_name,callback){
    base.query('select  from mv_url where mv_name=?',[mv_name],function(error,result,fields){
        if(error){
            callback(error,null);
        }else{
            callback(null,result);
        }
    });
};

/*通过电影名称获取电影的简要信息
* @param mv_name
* @return Movie*/
Movie.prototype.getMovieByName=function(mv_name,callback){
    base.query('select * from mv_info where mv_name=?',[mv_name],function(error,result,fields){
        if(error){
            callback(error,null);
        }else{
            callback(null,result);
        }
    });
};

/*获取总页数*/
Movie.getPages=function(pageSize,callback){
    getCount(function (err,res) {
        if(err){
            callback(err,null);
        }else{
            var pages=Math.ceil((res+pageSize-1)/pageSize)-1;
            callback(null,pages);
        }
    });
};

/*获取所有的电影基本信息，由于分页了，感觉这个没什么卵用，顺便写下*/
Movie.getAllMovies=function(callback){
    base.query('select * from mv_info',function(error,result,fields){
        if(error){
            callback(error,null);
        }else{
            callback(null,result);
        }
    });
};

/*随机获取一个简要电影信息对象，用于下一部电影，上一部电影操作*/
Movie.getOneMovie=function(callback){
    base.query('select * from mv_info order by rand() limit 1',function(error,result,fields){
        if(error){
            callback(error,null);
        }else{
            callback(null,result);
        }
    });
};

/*随机获取若干个简要电影信息对象，用于首页的轮播图*/
Movie.getRandomsMovies=function(size,callback){
    base.query('select * from mv_info order by rand() limit ?',[size],function(error,result,fields){
        if(error){
            callback(error,null);
        }else{
            callback(null,result);
        }
    });
};

/*获取某一页的电影信息
* @param pageNum 页码从1开始
* @param pageSize
* @return [Movie,...]*/
Movie.getMoviePage=function(pageNum,pageSize,callback){
    base.query('select * from mv_info limit ?,?',[(pageNum-1)*pageSize,pageNum*pageSize],function(error,result,fields){
        if(error){
            return callback(error,null);
        }else{
            return callback(null,result);
        }
    });
};

//获取总记录数
getCount=function(callback){
    base.query('select count(id) as pages from mv_info',function(error,result){
       if(error){
           callback(error,null);
       } else{
           callback(null,result[0].pages);
       }
    });
};

module.exports=Movie;