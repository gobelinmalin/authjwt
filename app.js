const express = require("express");
const jwt = require("jsonwebtoken");
const connection = require("./config");
const bcrypt = require("bcrypt");
const app = express();
const api = require("./routes");

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use("/api", api);

app.listen(5000, () => console.log("Server 5000"));
