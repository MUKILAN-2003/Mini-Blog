const mongo = require("mongoose");

const AddBlogSchema = new mongo.Schema(
  {
    b_title: { type: String, required: true },
    b_body: { type: String, required: true },
    b_author: { type: String, required: true },
    user_author: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "Blogs" }
);

const BlogAdd = mongo.model("AddBlogSchema", AddBlogSchema);
module.exports = { BlogAdd };
