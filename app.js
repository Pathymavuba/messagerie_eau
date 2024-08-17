var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
require("dotenv").config();
require("./config/db");


var usersRouter = require("./routes/users");
var autRouter = require("./routes/auth")

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//message for not found


app.get("/", (req, res) => {
  res.send("Bienvenu dans l'API EAU");
});
app.use("/", usersRouter);
app.use("/",autRouter)




module.exports = app;
