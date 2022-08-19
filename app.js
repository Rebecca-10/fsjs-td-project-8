var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Sequelize = require('./models/index.js').sequelize;
(async () => {
  try {
    await Sequelize.authenticate();
    console.log('Connection to the database successful!');
  } catch (error) {
    console.error('Error connecting to the database: ', error);
  }
})();




var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

//error inside for the routes 
app.use((req, res, next) => {
  var err = new Error('Sorry, Error')
  console.log('404 error handler called');
  err.status = 404;
  res.render('page-not-found', { err })
  });

//error outside 

  app.use((err, req, res, next) => {

    console.log('500 error being handled');
    err.status = 500;
    err.message = `Sorry, Error from server.`
    console.log(err.status);
    console.log(err.message);
    res.status(err.status || 500);
    res.render('error', { err });
  
});



module.exports = app;
