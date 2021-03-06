const express = require("express");
const { get } = require("http");
const cookieSession = require("cookie-session");

const TransactionsRoutes = require("./routes/TransactionsRoutes");
const userRoutes = require("./routes/user.routes")
const categoryBookRoutes = require("./routes/categoryBookRoutes")

const app = express();
var cors = require("cors");
app.use(cors());
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PATCH");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(
  cookieSession({
    username: "user-session",
    secret: "oogabooga", // should use as secret environment variable
    httpOnly: true
  })
);

app.use("/api/v1/users", TransactionsRoutes );
app.use("/api/v1/CategoryBooks",  categoryBookRoutes );



module.exports = app;