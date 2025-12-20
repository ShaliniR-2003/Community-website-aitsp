const express = require("express");
const User = require("../models/User");
const router = express.Router();

// get all public users
router.get("/", async (req, res) => {
  const users = await User.find({ visibility: "public", suspended: false })
    .select("name bio photo");
  res.json(users);
});

// update profile
router.put("/:id", async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.json("Profile updated");
});

// admin: suspend user
router.put("/suspend/:id", async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { suspended: true });
  res.json("User suspended");
});

// admin: delete user
router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json("User deleted");
});

module.exports = router;
