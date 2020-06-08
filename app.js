const express = require("express");
const app = express();
const api = require("./routes");
const cors = require("cors");

app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", api);

app.listen(3000, () => console.log("Server 3000"));
