var salesforce=require('salesforce');
var rand = require("random-key");
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var bcrypt=require('bcrypt');
	var auth=require('check_login');
exports.index=function(req,res){
	res.render('index');
};

//verify method
exports.verify=function(req,res)
{
	var key=req.query.key;
	salesforce.sobject('user__c').select('*').where("Key__c='"+key+"'").execute(function(err,records){
		if(records.length!=1)res.render('verify',{err:"User not found"});
		else
		{
			if(records[0].isVerified__c==false)
			{
				salesforce.sobject('user__c').update({
					Id: records[0].Id,
					isVerified__c: true
				});
				res.render('verify', {user:records[0]});
			}
			else
			{
				res.render('verify', {user:records[0], alreadyVerified:true});
			}
		}
	});
};

//signup method
exports.signup_1=[
body('fname', 'First name required').isLength({ min: 1 }).trim(),
sanitizeBody('fname').trim().escape(),
(req,res,next)=>{
	const errors=validationResult(req);
	if(!errors.isEmpty())
	{
		res.render('index',{errors:errors.array()});
		return;
	}
	else
	{

		salesforce.sobject("user__c").create({ Name : req.body.fname+req.body.lname , Email__c: req.body.email, First_Name__c: req.body.fname, Last_Name__c: req.body.lname, Password__c: bcrypt.hashSync(req.body.pwd,10), Key__c: rand.generate(30)}, function(err, ret) {
  			if (err || !ret.success) { return console.error(err, ret); }
		});
		res.render('index');
	}
  }
];

//login auth
exports.loginAuth=function(req,res)
{
	var sess=req.session;
	salesforce.sobject("user__c").select("*").where("Email__c='"+req.body.email+"'").execute(function(err,records){
		if(records.length==1 && bcrypt.compareSync(req.body.pwd,records[0].Password__c))
		{
			sess.user=records[0];
			res.redirect('/');
		}
		else
		{
			res.render('login',{invalid_login:req.flash('invalid_credentials')});
		}
	});
};
exports.logout=function(req,res)
{
	if(req.session && req.session.user)
	{
		req.session.destroy();
		res.redirect('/login?task=logout');
	}
}


