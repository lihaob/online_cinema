var express = require('express');
var router = express.Router();
var favoritesController=require('../controllers/favoritesController');

router.get('/getStatus',favoritesController.getStatus);
router.post('/switchStatus',favoritesController.switchStatus);

module.exports=router;