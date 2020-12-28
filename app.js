require("dotenv").config();
require("./config/mongo"); // database initial setup

//Base dependencies
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const app = express();
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");

//var indexRouter = require("./routes/index");
//var usersRouter = require("./routes/users");
//var authRouter = require("./routes/auth");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Session set-up
app.use(
  session({
    secret: process.env.SESSION_SECRET, //session_secret is pulled from .env file
    cookie: { maxAge: 6000000 }, // in millisec
    store: new MongoStore({
      mongooseConnection: mongoose.connection, // you can store session infos in mongodb :)
      ttl: 24 * 60 * 60, // 1 day
    }),
    saveUninitialized: true,
    resave: true,
  })
);

app.use("/", require("./routes/index"));
app.use("/", require("./routes/auth"));
app.use("/", require("./routes/users"));

//app.use("/", indexRouter);
//app.use("/users", usersRouter);
//app.use("/auth", authRouter);

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
