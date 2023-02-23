var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require("body-parser");
var cors = require('cors');

var indexRouter = require('./routes/index');

/* Import endpoint */
//    Khoa
var indexRouter = require("./routes/indexRouter");
var authRouter = require("./routes/authRouter");
var usersRouter = require("./routes/userRouter");
var specialistRouter = require("./routes/specialistRouter");

const connectToDb = require('./config/dbConnection');
const medicineRouter = require('./routes/medicineRouter');
const blogRouter = require('./routes/blogRouter');
const categoryRouter = require('./routes/categoryRouter');
const serviceRouter = require('./routes/serviceRouter');
const imageRouter = require('./routes/imageRouter');

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// const corsOptions = {
//   origin: 'http://localhost:3000',
//   credentials: true
// };
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
// app.use(cors(corsOptions));

// connect to database
connectToDb();

/* baseURL */
//  Khoa
app.use("/api/", indexRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/specialists", specialistRouter);
//  An + Minh
app.use("/api/medicines", medicineRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/categorys", categoryRouter);
app.use("/api/services", serviceRouter);
app.use('/image', imageRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
