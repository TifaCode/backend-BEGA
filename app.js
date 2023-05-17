require("dotenv").config();
require("./models/connectionDb");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var eventsRouter = require("./routes/events");
var strongboxRouter = require("./routes/strongbox");
var transactionRouter = require("./routes/transaction");
const todoRouter = require("./routes/todos");
const expenseRouter = require("./routes/expenses");

var app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/events", eventsRouter);
app.use("/strongbox", strongboxRouter);
app.use("/transaction", transactionRouter);
app.use("/todo", todoRouter);
app.use("/expense", expenseRouter);

//////////////////////google auth//////////////////////////
const session = require("express-session");
const oauthRouter = require("./routes/OAuth/googleAuth");
app.use(
  session({
    secret: "session-secret-here",
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
    resave: false,
    saveUninitialized: true,
  })
);
app.use("/", oauthRouter);
//////////////////////google auth//////////////////////////

module.exports = app;
