const express = require("express");
const AuthenticationController = require("../controller/authentication.js");

const router = express.Router();

router.post("/user_login", AuthenticationController.Login);
router.post("/user_register", AuthenticationController.Signup);
router.post("/user_feedback", AuthenticationController.Feedback);
router.post("/forgot_pass", AuthenticationController.ResetPass);

module.exports = router;
