const express = require("express");
const AuthenticationController = require("../controller/authentication.js");
const GetData = require("../controller/getdata.js");

const router = express.Router();

router.post("/user_login", AuthenticationController.Login);
router.post("/user_register", AuthenticationController.Signup);
router.post("/user_feedback", AuthenticationController.Feedback);
router.post("/forgot_pass", AuthenticationController.ResetPass);
router.post("/add_blog", AuthenticationController.AddNewBlog);

router.get("/get_all_blogs", GetData.GetAllBlog);
router.get("/get_my_blog/:username", GetData.GetMyData);
router.get("/detail-blogs/:id", GetData.GetOneData);

router.get("/blog-delete/:id", GetData.DeleteData);

module.exports = router;
