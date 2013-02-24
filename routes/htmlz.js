var moment = require('moment');
moment().format();
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/passportTest');
var db = mongoose.connection;


var userSchema = mongoose.Schema({
	fName: String,
	lName: String,
	userId: String,
	email: String,
	dob: Date,
	gender: String,
	startWeight: String,
	goalWeight: String
}, {collection: 'userData'});

var userData = mongoose.model('userData', userSchema);

exports.welcome = function(req, res){
	userData.find({"userId":req.user._id}, function results(err, docs){
		var date = moment.utc(docs[0].dob).format('YYYY-MM-DD');
		res.render('welcome', {
			title: "Welcome to Fat Track!",
			firstName: docs[0].fName,
			lastName: docs[0].lName,
			email: docs[0].email,
			dob: date,
			gender: docs[0].gender,
			weight: docs[0].startWeight,
			goal: docs[0].goalWeight,
			daysLeft: "PlaceHolder"
		});
	});
};

exports.register = function(req, res){
	res.render('register', {title: "Create a user and password."});
};

exports.demoUpdate = function(req, res){
	var formData = req.body;
	var uID = req.user._id;
	userData.update({userId: uID},
	{
		fName:formData.fname,
		lName:formData.lname,
		dob: formData.dob,
		gender: formData.gender,
		email: formData.email,
		startWeight: formData.weight,
		goalWeight: formData.goal
	}, function(err,numberAffected,raw){
		if (err) console.log(err);
		//console.log('Here\'s Mongo\'s response ', raw);
	});
	res.redirect('welcome#about');
};

