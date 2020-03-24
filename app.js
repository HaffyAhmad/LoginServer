var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var authenticate = require('./authenticate');
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var config = require('./config');
const mongoose = require('mongoose');

const url = config.mongoUrl;
const connect = mongoose.connect(url);
connect.then((db)=>{
  console.log('Connected correctly to the server');
}), (err)=>{
  console.log(err);
}
  
var app = express();

// view engine setup
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());


app.use('/', indexRouter);
app.use('/user', userRouter);

app.use(express.static(`${__dirname}/public`));



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
