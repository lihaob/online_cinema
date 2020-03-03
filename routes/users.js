var express = require('express');
var router = express.Router();

const userController=require('../controllers/userController')

/* 二级路由*/
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register',userController.register);
module.exports = router;
