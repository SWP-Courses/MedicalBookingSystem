var bodyParser = require("body-parser");
var createError = require("http-errors");
var cookieParser = require("cookie-parser");
var express = require("express");
var path = require("path");
var logger = require("morgan");
var dotenv = require("dotenv");
var cors = require("cors");

// endpoint
var indexRouter = require("./routes/indexRouter");
var authRouter = require("./routes/authRouter");
var usersRouter = require("./routes/userRouter");
var medicineRouter = require("./routes/medicineRouter");
var specialistRouter = require("./routes/specialistRouter");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

dotenv.config();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(cors());
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/", indexRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/medicines", medicineRouter);
app.use("/api/specialists", specialistRouter);

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
