/*收藏夹*/
var base=require('./base')
function Favorites(favorites){
    this.id=favorites.id;
    this.movie_id=favorites.movie_id;
    this.users_id=favorites.users_id;
}

//若存在，返回1，否则返回0
Favorites.prototype.find=function(callback){
    base.query('select * from favorites where users_id=? and movie_id=?',[this.users_id,this.movie_id],function(err,res,fields){
       if(err){
           callback(err,null);
       } else{
           callback(null,res.length);
       }
    });
};

Favorites.prototype.save=function(callback){
    base.query('insert into favorites(movie_id,users_id) values(?,?) ',[this.movie_id,this.users_id],function(err,res,fields){
        if(err){
            callback(err,null);
        }else{
            callback(null,res.insertId);
        }
    })
};

Favorites.prototype.delete=function(callback){
    base.query('delete from favorites where movie_id=? and users_id=?',[this.movie_id,this.users_id],function(err,res,fields){
        if(err){
            callback(err,null);
        }else{
            callback(null,res.affectedRows);
        }
    })
};



module.exports=Favorites;