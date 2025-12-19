const express = require("express");
const Post = require("../models/Post");

const router = express.Router();

router.post("/", async (req, res) => {
  const post = await Post.create(req.body);
  res.json(post);
});

router.get("/", async (req, res) => {
  res.json(await Post.find());
});

router.delete("/:id", async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json("Deleted");
});

module.exports = router;
