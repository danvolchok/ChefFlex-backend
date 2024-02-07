var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Mongo DB package
var mongoose = require('mongoose')
var configs = require("./config/globals")


// Authentication package
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

// CORS package; fixes fetch error in SwaggerUI
var cors = require('cors');

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var jobsRouter = require('./routes/api/jobs');
var signUpRouter = require('./routes/signUp')



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(cors());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/jobs', jobsRouter);
app.use('/login', loginRouter)
app.use('/signUp', signUpRouter)

// initialize passport and strategy
app.use(passport.initialize());


passport.use(
  new BasicStrategy((username, password, done) => {
    // provide code to find user and validate password
    // hardcode credentials admin:default
    // valid login YWRtaW46ZGVmYXVsdA==
    if (username == "admin" && password == "default") {
      console.log(`User ${username} authenticated successfully!`);
      return done(null, username);
    } else {
      console.log(`User ${username} authentication failed!`);
      return done(null, false);
    }
  })
);


//app.use('/', indexRouter);
// legacy endpoint
app.use(
  "/api/jobs",
  passport.authenticate("basic", { session: false }),
  jobsRouter
);

// Connect to DB after router/controller configuration
mongoose
  .connect(configs.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((message) => {
    console.log("App connected successfully!");
  })
  .catch((error) => {
    console.log("Error while connecting: " + error);
  });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;