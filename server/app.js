var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
const cookieSession = require("cookie-session");
require("dotenv").config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
const stripeRouter = require("./routes/stripe");

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(cookieSession({
  secret: "s3cr3tk3y",
  maxAge: 1000 * 60 * 60 * 24 * 7,
  // sameSite: "none",
  // secure: true
}));

app.use(function (req, res, next) {
  console.log('Cookies:', req.cookies);
  console.log("Session: ", req.session);
  next();
});

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/stripe", stripeRouter);


// console.log(process.env);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
