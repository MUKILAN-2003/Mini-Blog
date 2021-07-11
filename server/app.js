const express = require("express");
const mongo = require("mongoose");
const corns = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const connect_mongo = process.env.MONGODB_URI;
const port = process.env.PORT || 8000;

mongo.connect(connect_mongo, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.listen(port);
console.log("Server on 192.168.0.103 :: " + port);

app.get("/Test", (req, res) => {
  console.log("Running");
  res.end();
});
