var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require("body-parser");
var cors = require("cors");
const cookieSession = require("cookie-session");
const passportSetup = require("./passport");
const passport = require("passport");

var indexRouter = require("./routes/index");

/* Import endpoint */
//    Khoa
const authRouter = require("./routes/authRouter");
const usersRouter = require("./routes/userRouter");
const specialistRouter = require("./routes/specialistRouter");
const drugBillRouter = require("./routes/drugBillRouter");

const connectToDb = require("./config/dbConnection");
const medicineRouter = require("./routes/medicineRouter");
const blogRouter = require("./routes/blogRouter");
const categoryRouter = require("./routes/categoryRouter");
const serviceRouter = require("./routes/serviceRouter");
const bookingRouter = require("./routes/bookingRouter");
const bookedServiceRouter = require("./routes/bookedServiceRouter");
const imageRouter = require("./routes/imageRouter");
const Absent = require("./models/Absent");
const Slot = require("./models/Slot");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// parse application/x-www-form-urlencoded
// parse application/json
app.use(
  cookieSession({ name: "session", keys: ["cus"], maxAge: 24 * 60 * 60 * 100 })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(logger("dev"));
app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// app.use(cors(corsOptions));

// connect to database
connectToDb();

/* baseURL */
//  Khoa
app.use("/api/", indexRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/specialists", specialistRouter);
app.use("/api/drugbill", drugBillRouter);
app.use("/api/absent", async (req, res) => {
  try {
    console.log(req.body.date);
    console.log(new Date(decodeURIComponent(req.body.date)));
    const absent = await Absent.create({
      doctor_id: req.body.id,
      // date: new Date(req.body.date + "T12:00:00"),
      date: new Date(decodeURIComponent(req.body.date)),
    });
    res.status(200).json(absent);
  } catch (err) {
    console.log(err);
  }
});
app.use("/api/booking", bookingRouter);
app.use("/api/bookedservices", bookedServiceRouter);

//  An + Minh
app.use("/api/medicine", medicineRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/services", serviceRouter);
app.use("/image", imageRouter);

// catch 404 and forward to error handler
app.use(function (req, res, err, next) {
  // console.log(err);
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
