const express = require("express");
const mongo = require("mongoose");
const corns = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const Controller = require("./routes/routting.js");

dotenv.config();
const app = express();
app.use(corns());
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.static("client/build"));
app.use(express.urlencoded({ extended: true }));

const connect_mongo =
  process.env.MONGODB_URI ||
  "mongodb+srv://Muki:cluster_db@cluster.gdtr3.mongodb.net/Mini-Blog?retryWrites=true&w=majority";
const port = process.env.PORT || 8000;

mongo.connect(connect_mongo, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.listen(port);
console.log("Server Listening :: " + port);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.use(Controller);
