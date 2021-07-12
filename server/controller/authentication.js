const user_pass_feed = require("../modal/M_Authentication.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const createToken_Login = (id) => {
  return jwt.sign({ id }, "%$iwudibdiiwd@#$wdjdwnomdw(*&whdwhd#$>idnw(*&^");
};

const Login = async (req, res) => {
  user_find = req.body;
  const user = await user_pass_feed.UserDetail.findOne({
    username: user_find.username,
  }).lean();
  if (!user) {
    res.send(
      JSON.stringify({
        message: "Username Does not Exist",
      })
    );
  } else {
    if (await bcrypt.compare(user_find.password, user.password)) {
      const token = createToken_Login(user._id);
      res.cookie("jwt", token);
      res.send(
        JSON.stringify({
          message: "CleanRun",
        })
      );
    } else {
      res.send(
        JSON.stringify({
          message: "Password Incorrect",
        })
      );
    }
    res.end();
  }
};

const Signup = async (req, res) => {
  var strongPassword = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})"
  );
  if (!strongPassword.test(req.body["password"])) {
    res.send(
      JSON.stringify({
        message:
          "Password Must Contain [1 UpperCase, 1 LowerCase,1 Number, 1 Special Chracter, At least 6 Chracter]",
      })
    );
  } else {
    req.body["password"] = await bcrypt.hash(req.body["password"], 12);
    var User_Registry = new user_pass_feed.UserDetail(req.body);
    User_Registry.save()
      .then((result) => {
        res.send(JSON.stringify({ message: "CleanRun" }));
      })
      .catch((error) => {
        if (error.code == 11000) {
          res.send(JSON.stringify({ message: "Username Already Exist" }));
        } else {
          res.send(JSON.stringify({ message: "Sorry! Try Again later" }));
        }
      });
  }
};

const ResetPass = async (req, res) => {
  console.log("Controller Reset Password");
  console.log(req.body);
  res.redirect("/");
};

const Feedback = async (req, res) => {
  var User_Feedback = new user_pass_feed.FeedBack(req.body);
  User_Feedback.save()
    .then((result) => {
      res.send(JSON.stringify({ message: "CleanRun" }));
    })
    .catch((error) => {
      if (error) {
        res.send(JSON.stringify({ message: "Sorry! Try Again later" }));
      }
    });
};

module.exports = { Login, Signup, ResetPass, Feedback };
