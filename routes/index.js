var express = require('express');
var router = express.Router();
var homeController=require('../controllers/homeController'); 
var userController=require('../controllers/userController'); 
var isUser=require('../middleware/isUser');
var isGuest=require('../middleware/isGuest');
/* GET home page. */
router.get('/', isUser.isUser, homeController.index);
router.get('/update_billing_info', isUser.isUser,homeController.fetchBillingInfo);
router.get('/confirm_signup',homeController.verify);
router.post('/change_address', homeController.update_billing_info_form);
router.post('/add_address', homeController.add_address);
router.post('/update_address', homeController.update_address);
router.post('/signup',homeController.signup_1);
router.post('/login',homeController.loginAuth);
router.post('/logout',homeController.logout);
router.get('/logout',isGuest.isGuest,homeController.logout);
router.get('/login',isGuest.isGuest, function(req,res){res.render('login')});
module.exports = router;
