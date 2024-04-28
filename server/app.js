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
app.use(cookieSession({
  secret: "s3cr3tk3y",
  // secure: true,
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000 * 7, // 7 days
  // domain: "http://localhost:5173",
}));

app.use(cors({
  origin: "http://127.0.0.1:5173",
  credentials: true,
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use("/api/auth", authRouter);
app.use("/payments", stripeRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

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
