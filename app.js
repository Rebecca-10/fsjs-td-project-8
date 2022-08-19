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

app.get('/')

//error inside for the routes 
app.use((req, res, next) => {
  const err = new Error("not-found");
  err.status = 404;
  err.message = "404 error ";
  next(err);
});

//error outside 
app.use((err, req, res) => {
  if (err) {
    if (err.status === 404) {
      res.status(404)
      render(err.message, { err });
    } else {
      err.message = "Sorry, Error with the server";
      res.status(500).render('error', { err });
    }
  }
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database successful!');
  } catch (error) {
    console.error('Error connecting to the database: ', error);
  }
})();



module.exports = app;
