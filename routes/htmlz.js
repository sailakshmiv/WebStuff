
/*
 * GET home page.
 */

exports.welcome = function(req, res){
	console.log(req);
	res.render('welcome', {title: "Welcome to Fat Track!", lgnUser: req.user.username });
};

exports.register = function(req, res){
	console.log(req);
	res.render('register', {title: "register activated!", lgnUser: "Register activated!"});
};