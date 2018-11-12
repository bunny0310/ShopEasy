var salesforce=require('salesforce');
exports.fetchBillingInfo=function(req,res){
		salesforce.sobject("Address__c").select("*").where("user__c.Email__c='"+req.session.email+"'").execute(function(err,records){
			res.send('aaa');
		});
};