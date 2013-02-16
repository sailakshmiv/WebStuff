var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/passportTest');
var db = mongoose.connection;

var userSchema = mongoose.Schema({
	fName: String,
	lName: String,
	userId: String,
	email: String,
	dob: Date,
	startWeight: String,
	goalWeight: String
	
}, {collection: 'userData'});

var userData = mongoose.model('userData', userSchema);

exports.welcome = function(req, res){
	userData.find({"userId":req.user._id}, function results(err, docs){
		console.log(docs[0]);
		res.render('welcome', {
			title: "Welcome to Fat Track!",
			firstName: docs[0].fName,
			lastName: docs[0].lName,
			email: docs[0].email,
			dob: docs[0].dob,
			weight: docs[0].startWeight,
			goal: docs[0].goalWeight,
			userAge: docs[0].age
		});
	});
};

exports.register = function(req, res){
	res.render('register', {title: "Create a user and password."});
};

exports.demoUpdate = function(req, res){
	var formData = req.body;
	var uID = req.user._id;
	console.log(uID);
	console.log(formData.fname);
	console.log(formData.lname);
	console.log(formData.dob);
	console.log(formData.email);
	console.log(formData.weight);
	console.log(formData.goal);
	userData.update({userId: uID},
	{
		fName:formData.fname,
		lName:formData.lname,
		dob: formData.dob,
		email: formData.email,
		startWeight: formData.weight,
		goalWeight: formData.goal
	}, function(err,numberAffected,raw){
		if (err) console.log(err);
		console.log('Here\'s Mongo\'s response ', raw);
	});
	res.redirect('welcome#about');
};