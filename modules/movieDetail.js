/*电影详细信息*/
var base=require('base')

function MovieDetail(movieDetail){
    this.id=movieDetail.id;
    this.mv_director=movieDetail.mv_director;
    this.mv_cates=movieDetail.mv_cates;
    this.mv_tag=movieDetail.mv_tag;
    this.mv_desc=movieDetail.mv_desc;
}

/*通过电影id获取详细信息,当进入到播放界面时，调用此来获取详细信息
* @param id
* @return [MovieDetail]*/
Movie.getMovieDetailById=function (id,callback) {
    base.query('select * from mv_detail_info where id=?',[id],function(err,res){
        if(err){
            callback(err,null);
        }else{
            callback(null,res);
        }
    });
};

module.exports=MovieDetail;