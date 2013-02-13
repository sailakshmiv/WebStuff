/**
 * Module dependencies.
 */

var express = require('express')
  , passport = require('passport')
  , util = require('util')
  , LocalStrategy = require('passport-local').Strategy
  , routes = require('./routes')
  , user = require('./routes/user')
  , htmlz = require('./routes/htmlz')
  , http = require('http')
  , path = require('path')
  , flash = require('connect-flash')

var Account = require('./account');
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

passport.use(new LocalStrategy(Account.authenticate()));

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 8080);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({secret:'whatever'}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});
var aTest = "Passed from app.js";
app.get('/', routes.index);
app.get ('/register', htmlz.register);
app.get('/logout', function(req,res){
  req.logout();
  res.redirect('/');
});

app.get('/welcome', ensureAuthenticated, htmlz.welcome);
app.get('/users', user.list);

app.post('/',
  passport.authenticate('local', {failureRedirect: '/'}),
  function(req,res) {
    res.redirect('/welcome');
});

app.post('/register', function(req,res){
  Account.register(new Account({username: req.body.actName}), req.body.actPass, function(err, account) {
    if (err){
      return res.render('register', {account: account});
    }
    res.redirect('/');
  });
});

function ensureAuthenticated(req,res,next){
  if (req.isAuthenticated()) {return next(); }
  res.redirect('/');
}

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});