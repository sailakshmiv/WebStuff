
/*
 * GET home page.
 */

exports.welcome = function(req, res){
	console.log(req);
  res.render('welcome', { title: "Welcome to Fat Track!", lgnUser: req.user.username });
};