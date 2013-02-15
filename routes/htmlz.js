var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/passportTest');
var db = mongoose.connection;


var userSchema = mongoose.Schema({
	age: String,
	fName: String,
	lName: String,
	userId: String
}, {collection: 'userData'});

var userData = mongoose.model('userData', userSchema);

exports.welcome = function(req, res){
	userData.find({"userId":req.user._id}, function results(err, docs){
		res.render('welcome', {
			title: "Welcome to Fat Track!",
			firstName: docs[0].fName,
			lastName: docs[0].lName,
			userAge: docs[0].age
		});
	});
};

exports.register = function(req, res){
	res.render('register', {title: "Create a user and password."});
};

exports.demoUpdate = function(req, res){
	console.log(req.user._id);
	//console.log(req.body);
	console.log(req.body.fname);
	console.log(req.body.lname);
	userData.update({userId: req.user._id},{fName:req.body.fname,lName:req.body.lname}, function(err,numberAffected,raw){
		if (err) console.log(err);
		console.log('The number of records updated was %d', numberAffected);
		console.log('Here\'s Mongo\'s response ', raw);
	});
	res.redirect('welcome#about');
};