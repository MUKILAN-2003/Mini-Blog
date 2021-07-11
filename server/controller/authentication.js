const user_pass_feed = require("../modal/M_Authentication.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const Login = async (req, res) => {
  console.log("Controller Login");
  console.log(req.body);
  res.redirect("/");
};

const Signup = async (req, res) => {
  console.log("Controller Signup");
  req.body["password"] = await bcrypt.hash(req.body["password"], 12);
  var User_Registry = new user_pass_feed.UserDetail(req.body);
  User_Registry.save()
    .then((result) => {
      res.send(JSON.stringify({ message: "CleanRun" }));
    })
    .catch((error) => {
      if (error.code == 11000) {
        res.send(JSON.stringify({ message: "Username Already Exist" }));
      }
    });
};

const ResetPass = async (req, res) => {
  console.log("Controller Reset Password");
  console.log(req.body);
  res.redirect("/");
};

const Feedback = async (req, res) => {
  console.log("Controller Feedback");
  console.log(req.body);
  res.redirect("/");
};

module.exports = { Login, Signup, ResetPass, Feedback };
