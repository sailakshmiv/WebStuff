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