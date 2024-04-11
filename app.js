var createError = require('http-errors');
var express = require('express');
var { engine } = require('express-handlebars');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require('jsonwebtoken');
var bcryptjs = require('bcryptjs');
var mongoose = require('mongoose');
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy; 
var cors = require('cors');

// Load global configuration
var configs = require("./config/globals");

// Define routes
var indexRouter = require('./routes/index');
var jobsRouter = require('./routes/api/jobs');
var dashboardRouter = require('./routes/dashboard');
var jobPostingsRouter = require('./routes/jobPostings');

var app = express();

// Passport Basic Strategy
passport.use(new BasicStrategy((username, password, done) => {
  // Provide code to find user and validate password here
  // This is just a placeholder for your actual validation logic
  if (username === "admin" && password === "default") {
    console.log(`User ${username} authenticated successfully!`);
    return done(null, username);
  } else {
    console.log(`User ${username} authentication failed!`);
    return done(null, false);
  }
}));

// view engine setup
app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'layout', // Set this to 'layout' to match your file
  helpers: {
    join: function(context, options) {
      return context.join(options.hash.delimiter);
    }
    // Other helpers can also be added here
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Passport.js
app.use(passport.initialize());

// Routes setup
app.use('/', indexRouter);
app.use('/api/jobs', jobsRouter);
app.use('/dashboard', dashboardRouter);
app.use('/jobsPostings', jobPostingsRouter);

// Connect to MongoDB
mongoose.connect(configs.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to the database successfully!");
}).catch(err => {
  console.error("Error while connecting to the database:", err);
});

// Error handlers
// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// General error handler
app.use(function(err, req, res, next) {
  // Set locals, providing error only in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
