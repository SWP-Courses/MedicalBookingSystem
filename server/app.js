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
const authRouter = require("./routes/authRouter");
const usersRouter = require("./routes/userRouter");
const specialistRouter = require("./routes/specialistRouter");
const drugBillRouter = require('./routes/drugBillRouter')

const connectToDb = require('./config/dbConnection');
const medicineRouter = require('./routes/medicineRouter');
const blogRouter = require('./routes/blogRouter');
const categoryRouter = require('./routes/categoryRouter');
const serviceRouter = require('./routes/serviceRouter');
const bookingRouter = require('./routes/bookingRouter');
const bookedServiceRouter = require('./routes/bookedServiceRouter');
const imageRouter = require('./routes/imageRouter');
const roomRouter = require('./routes/roomRouter');
const Absent = require('./models/Absent');
const socket = require("socket.io");
const chatRouter = require('./routes/chatRouter');

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// const corsOptions = {
//   origin: 'http://localhost:3000',
//   credentials: true
// };
// parse application/x-www-form-urlencoded
// parse application/json

// app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
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
app.use('/api/drugbill', drugBillRouter),
  app.use("/api/absent", async (req, res) => {
    try {
      const absent = await Absent.create({
        doctor_id: req.body.id,
        date: req.body.date
      })
      res.status(200).json(absent)
    } catch (err) {
      console.log(err);
    }
  });
//  An + Minh
app.use("/api/medicine", medicineRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/category", categoryRouter);
app.use("/api/services", serviceRouter);
app.use('/image', imageRouter);
app.use('/api/room', roomRouter);
app.use('/api/message', chatRouter);


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

const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    Credential: true,
  }
});

httpServer.listen(8080);

global.onlineUser = new Map();

global.io = io;

io.on("connection", (socket) => {
  const newConnectUserId = socket.handshake.query.userId;
  onlineUser.set(newConnectUserId, socket.id);

  socket.on("send_message", messageInfo => {
    const recipientSocketId = onlineUser.get(messageInfo.recipient_id);
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("message_recieve", messageInfo);
    }
  })

});

module.exports = app;
