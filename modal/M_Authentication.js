const mongo = require("mongoose");

const UserSchema = new mongo.Schema(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    mail: { type: String, required: true },
    password: { type: String, required: true },
  },
  { collection: "Users" }
);

const ResetPass = new mongo.Schema(
  {
    username: { type: String, required: true },
    mail_id: { type: String, required: true },
    createdAt: { type: Date, default: new Date() },
  },
  { collection: "Password Reset" },
  { timestamps: true }
);
ResetPass.index({ createdAt: 1 }, { expireAfterSeconds: 1800 });

const FeedSchema = new mongo.Schema(
  {
    name: { type: String, required: true },
    mail_id: { type: String, required: true },
    feedback: { type: String, required: true },
  },
  { collection: "Feedback" }
);

const ReesetPass = mongo.model("ResetPass", ResetPass);
const FeedBack = mongo.model("FeedSchema", FeedSchema);
const UserDetail = mongo.model("UserSchema", UserSchema);

module.exports = { FeedBack, ReesetPass, UserDetail };
