var sf = require('node-salesforce');
var http = require('http');
var conn = new sf.Connection({
  // you can change loginUrl to connect to sandbox or prerelease env.
  loginUrl : 'https://login.salesforce.com'
});
conn.login('ikhurana@umass.edu','ishaan123hwjf4MfRRJJ13yy1rY9DH1r4');
module.exports=conn