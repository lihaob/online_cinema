var Favorites=require('../../modules/favorites');

var favorites=new Favorites({
    users_id:7123,
    movie_id:1108171800
})
favorites.find(function (err,res) {
    console.log(res)
})