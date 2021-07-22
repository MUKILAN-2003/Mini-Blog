const user_pass_feed = require("../modal/M_Authentication.js");
const { BlogAdd } = require("../modal/M_Blog.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, //secure port for modern apps with TLC encryption
  secure: false, //only true when using 465 port
  auth: {
    user: "mukilan069@gmail.com",
    pass: "sjravhxqfdcrgpjr",
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Mail Server Check.................ok");
  }
});

const createToken_Login = (id, name, username, mail) => {
  return jwt.sign(
    { id, name, username, mail },
    "%$iwudibdiiwd@#$wdjdwnomdw(*&whdwhd#$>idnw(*&^"
  );
};

const send_mail_reset = async (mailto, tmpid, tmptoken, userid, tmpname) => {
  var redirect_link =
    "https://web-miniblog.herokuapp.com//reset/password/" +
    tmpid +
    "/" +
    tmptoken +
    "/" +
    userid;
  let info = await transporter.sendMail({
    from: "mukilan069@gmail.com",
    to: mailto,
    subject: "MiniBlog Password Reset",
    html: `<div style=text-align:center' ;>
      <br />
      <h1 style='text-align:left' ;>Hello ${tmpname},</h1>
      <h2 style='text-align:center;'><b><a href=${redirect_link} target='_blank'>Click To Reset Password</a></b></h2>
      <p>Link Will be expire in 30 minutes</p>
      <br />
      <p style="color:white;text-align:center;width: 100%;background-color: rgba(0, 0, 0, 0.192);">SM Bro's &copy; 2021</p>
      <br />
  </div>`,
  });
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
      const token = createToken_Login(
        user._id,
        user.name,
        user.username,
        user.mail
      );
      res.send(
        JSON.stringify({
          message: "CleanRun",

          jwt: token,
        })
      );
    } else {
      res.send(JSON.stringify({ message: "Password Incorrect" }));
    }
    res.end();
  }
};

const Signup = async (req, res) => {
  var strongPassword = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"
  );
  if (!strongPassword.test(req.body["password"])) {
    res.send(
      JSON.stringify({
        message:
          "Password Must Contain [1 UpperCase, 1 LowerCase,1 Number, At least 6 Chracter]",
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

const createToken_PR = (id) => {
  return jwt.sign({ id }, "^&*(wndi>$#dhwdhw&*(wdmonwdjdw$#@dwiidbiduwi$%");
};

const ResetPass = async (req, res) => {
  const check_if_exist = await user_pass_feed.ReesetPass.findOne({
    username: req.body["username"],
  }).lean();
  if (check_if_exist) {
    res.send(
      JSON.stringify({
        message: "In last [30 min] already applied / check registered email id",
      })
    );
  } else {
    var pr = new user_pass_feed.ReesetPass(req.body);
    const user_reset = await user_pass_feed.UserDetail.findOne({
      username: pr.username,
    }).lean();
    if (user_reset) {
      if (user_reset.mail == req.body["mail_id"]) {
        pr.save()
          .then(async (result) => {
            const temp_data = await user_pass_feed.ReesetPass.findOne({
              username: user_reset.username,
            }).lean();
            const tmp_token = createToken_PR(temp_data);
            send_mail_reset(
              user_reset.mail,
              temp_data._id,
              tmp_token,
              user_reset._id,
              user_reset.name
            ).catch(console.error);
            res.send(
              JSON.stringify({
                message: "Check your Registered Mail ID to reset password",
                token: tmp_token,
              })
            );
          })
          .catch((error) => {
            console.log(error);
            res.send(JSON.stringify({ message: "Username/Mail Invalid" }));
          });
      } else {
        res.send(JSON.stringify({ message: "Username and Mail Mismatch" }));
      }
    } else {
      res.send(JSON.stringify({ message: "Username Invalid" }));
    }
  }
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

const AddNewBlog = async (req, res) => {
  var N_Blog = new BlogAdd(req.body);
  if (!(req.body["b_title"] && req.body["b_body"])) {
    res.send(JSON.stringify({ message: "Warning! Field are Empty" }));
  } else {
    N_Blog.save()
      .then((result) => {
        res.send(JSON.stringify({ message: "CleanRun" }));
      })
      .catch((error) => {
        if (error) {
          res.send(JSON.stringify({ message: "Sorry! Try Again later" }));
        }
      });
  }
};

const email_checked = async (req, res) => {
  if (!(req.body["username"] == null || req.body["password"] == null)) {
    var strongPassword = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"
    );
    if (!strongPassword.test(req.body["password"])) {
      res.send(
        JSON.stringify({
          message:
            "Password Must Contain [1 UpperCase, 1 LowerCase,1 Number, At least 6 Chracter]",
        })
      );
    } else {
      const get_cookie = jwt.verify(
        req.params["tkn"],
        "^&*(wndi>$#dhwdhw&*(wdmonwdjdw$#@dwiidbiduwi$%"
      );
      const user = await user_pass_feed.UserDetail.findOne({
        username: req.body["username"],
      }).lean();
      const verify = await user_pass_feed.ReesetPass.findOne({
        _id: get_cookie.id._id,
      }).lean();

      if (user && verify) {
        req.body["password"] = await bcrypt.hash(req.body["password"], 12);
        user_pass_feed.UserDetail.updateOne(
          { username: req.body["username"] },
          { password: req.body["password"] },
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send(JSON.stringify({ message: "CleanRun" }));
            }
          }
        );
      } else {
        res.send(JSON.stringify({ message: "Username/Link Invalid" }));
      }
    }
  } else {
    res.send(JSON.stringify({ message: "Fill all the fields" }));
  }
};

module.exports = {
  Login,
  Signup,
  ResetPass,
  Feedback,
  email_checked,
  AddNewBlog,
};
