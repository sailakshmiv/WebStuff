
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


var users = [
{id: 1, username: 'ed', password: 'password', email: 'whatever@aol.com'},
{id: 2, username: 'yt', password: 'password', email: 'whatever@aol.com'},
{id: 3, username: 'wayne', password: 'password', email: 'doesn\'tmatter@aol.com'}
];

function findById(id,fn) {
  var idx = id - 1;
  if (users[idx]) {
    fn(null,users[idx]);
  } else {
    fn(new Error('User ' + id + ' does not exist'));
  }
}

function findByUsername(username, fn){
  for (var i = 0, len = users.length;i < len; i++){
    var user = users[i];
    if (user.username === username) {
      return fn(null, user);
    }
  }
  console.log(user);
  return fn(null,'invalid user');
}

passport.serializeUser(function(user,done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  findById(id, function(err,user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    process.nextTick(function () {
      findByUsername(username, function(err, user) {
        if (err) {return done(err);}
        if (!user) {
          req.flash("User doesn't exist");
          return done(null, false, {message: 'User Does not exist ' + username});}
        if (user.password != password) {return done(null, false, {message: 'Invalid password' });}
        return done(null, user);
      });
    });
  }
));


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

app.get('/', routes.index);
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

function ensureAuthenticated(req,res,next){
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {return next(); }
  res.redirect('/');
}

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


