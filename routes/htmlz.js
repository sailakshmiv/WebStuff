
/*
 * GET home page.
 */

exports.welcome = function(req, res){
	var aTest = "This variable is in the welcome function.";
	res.render('welcome', {
		title: "Welcome to Fat Track!",
		lgnUser: req.user.username,
		firstItem: req.user._id,
		secondItem: req.user.username,
		thirdItem: aTest
	});
};

exports.register = function(req, res){
	res.render('register', {title: "Create a user and password."});
};