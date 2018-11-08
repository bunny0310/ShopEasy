var express = require('express');
var router = express.Router();
var homeController=require('../controllers/homeController'); 
var authMiddleware=require('../middleware/authMiddleware'); 
/* GET home page. */
router.get('/', authMiddleware.isUser, homeController.index);
router.get('/confirm_signup', authMiddleware.isGuest,homeController.verify);
router.post('/signup',homeController.signup_1);
router.post('/login',homeController.loginAuth);
router.post('/logout',homeController.logout);
router.get('/logout',authMiddleware.isGuest,homeController.logout);
router.get('/login',authMiddleware.isGuest, function(req,res){res.render('login')});
module.exports = router;
