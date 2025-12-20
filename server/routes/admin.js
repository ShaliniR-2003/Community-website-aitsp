const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

/* GET ALL USERS */
router.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

/* SUSPEND USER */
router.put("/suspend/:id", async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { suspended: true });
  res.json("User suspended");
});

/* DELETE USER */
router.delete("/user/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json("User deleted");
});

/* GET ALL POSTS */
router.get("/posts", async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

/* APPROVE POST */
router.put("/approve/:id", async (req, res) => {
  await Post.findByIdAndUpdate(req.params.id, { status: "published" });
  res.json("Post approved");
});

/* DELETE POST */
router.delete("/post/:id", async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json("Post deleted");
});

/* BASIC STATS */
router.get("/stats", async (req, res) => {
  const users = await User.countDocuments();
  const posts = await Post.countDocuments();
  res.json({ users, posts });
});

module.exports = router;
