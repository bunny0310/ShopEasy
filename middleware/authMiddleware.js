exports.isUser=function(req,res,next)
{
	if(req.session && req.session.user)next();
	res.redirect('/login');
}
exports.isGuest=function(req,res,next)
{
	if(!(req.session && req.session.user))next();
	res.redirect('/');
}