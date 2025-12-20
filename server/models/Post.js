const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: String,
  content: String,

  status: {
    type: String,
    enum: ["draft", "published"],
    default: "draft"
  },

  author: String,

  comments: [
    {
      user: String,
      text: String
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Post", postSchema);
