var sf = require('node-salesforce');
var http = require('http');
var conn = new sf.Connection({
  // you can change loginUrl to connect to sandbox or prerelease env.
  loginUrl : 'https://login.salesforce.com'
});
exports.salesforce=function()
{
	return conn;
};