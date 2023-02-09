var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
var cors = require("cors");

/* Import endpoint */
//    Khoa
var indexRouter = require("./routes/indexRouter");
var authRouter = require("./routes/authRouter");
var usersRouter = require("./routes/userRouter");
var specialistRouter = require("./routes/specialistRouter");
//    An
const medicineRouter = require("./routes/medicineRouter");
const blogRouter = require("./routes/blogRouter");
const categoryRouter = require("./routes/categoryRouter");
const serviceRouter = require("./routes/serviceRouter");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// connect to database
const connectToDb = require("./config/dbConnection");
connectToDb();

/* baseURL */
//  Khoa
app.use("/api/", indexRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/specialists", specialistRouter);
//  An
app.use("/api/medicine", medicineRouter);
app.use("/api/blog", blogRouter);
app.use("/api/category", categoryRouter);
app.use("/api/service", serviceRouter);

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
