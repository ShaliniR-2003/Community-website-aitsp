const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// CREATE POST (Draft or Published)
router.post("/", async (req, res) => {
  try {
    const { title, content, status, author } = req.body;

    const post = new Post({
      title,
      content,
      status,
      author,
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL POSTS (Draft + Published)
router.get("/", async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

// ADD COMMENT TO A POST
router.post("/:id/comment", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.comments.push({
      user: req.body.user,
      text: req.body.text,
    });
    await post.save();
    res.status(200).json(post); // return updated post
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ADMIN: APPROVE POST
router.put("/approve/:id", async (req, res) => {
  await Post.findByIdAndUpdate(req.params.id, {
    status: "published",
  });
  res.json("Approved");
});

// ADMIN: DELETE POST
router.delete("/:id", async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json("Deleted");
});

module.exports = router;
