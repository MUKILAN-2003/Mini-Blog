const user_pass_feed = require("../modal/M_Authentication.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const GetAllBlog = async (req, res) => {
  const allData = await user_pass_feed.BlogAdd.find().lean();
  res.send(JSON.stringify({ allData }));
};

const GetMyData = async (req, res) => {
  const allData = await user_pass_feed.BlogAdd.find({
    user_author: req.params["username"],
  }).lean();
  res.send(JSON.stringify({ allData }));
};

const GetOneData = async (req, res) => {
  const allData = await user_pass_feed.BlogAdd.find({
    _id: req.params["id"],
  }).lean();
  res.send(JSON.stringify({ allData }));
};

const DeleteData = async (req, res) => {
  console.log("hello");
  user_pass_feed.BlogAdd.findByIdAndDelete(req.params["id"])
    .then((result) => {
      res.send(JSON.stringify({ message: "CleanRun" }));
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = { GetAllBlog, GetMyData, GetOneData, DeleteData };
