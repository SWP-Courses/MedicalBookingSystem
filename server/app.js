var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require("body-parser");
var cors = require('cors');

var indexRouter = require('./routes/index');

const connectToDb = require('./config/dbConnection');
const medicineRouter = require('./routes/medicineRouter');
const blogRouter = require('./routes/blogRouter');
const categoryRouter = require('./routes/categoryRouter');
const serviceRouter = require('./routes/serviceRouter');
const imageRouter = require('./routes/imageRouter');

var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

//Connect to database
connectToDb();

//json
app.use(bodyParser.json());
app.use('/api/medicine', medicineRouter);
app.use('/api/blog', blogRouter);
app.use('/api/category', categoryRouter);
app.use('/api/service', serviceRouter);
app.use('/image', imageRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

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
