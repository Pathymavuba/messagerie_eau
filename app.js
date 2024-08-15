var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
require("dotenv").config();
require("./config/db");


var usersRouter = require("./routes/users");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//message for not found
app.all("*",(request,response)=>{
  response.sendStatus(404)
})

app.get("/", (req, res) => {
  res.send("Bienvenu dans l'API EAU");
});
app.use("/users", usersRouter);




module.exports = app;
