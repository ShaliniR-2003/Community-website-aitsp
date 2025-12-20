const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  bio: String,
  photo: String,
  visibility: { type: String, default: "public" }, // public/private
  role: { type: String, default: "user" },
  suspended: { type: Boolean, default: false }
});

module.exports = mongoose.model("User", UserSchema);
