import { useEffect, useState } from "react";
import axios from "axios";

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({}); // object for per-post comment input

  // Fetch published posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("https://community-website-aitsp.onrender.com/api/posts");
        const publishedPosts = res.data.filter(post => post.status === "published");
        setPosts(publishedPosts);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPosts();
  }, []);

  // Add comment for a specific post
  const addComment = async (postId) => {
    if (!comments[postId] || comments[postId].trim() === "") {
      alert("Comment cannot be empty");
      return;
    }

    try {
      // POST comment to backend
      const res = await axios.post(`https://community-website-aitsp.onrender.com/api/posts/${postId}/comment`, {
        text: comments[postId],
        user: localStorage.getItem("name") || "Anonymous",
      });

      // Update posts state instantly
      setPosts(posts.map(post => 
        post._id === postId ? res.data : post
      ));

      // Clear input for this post
      setComments(prev => ({ ...prev, [postId]: "" }));
    } catch (err) {
      console.log(err);
      alert("Failed to add comment");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Community Blogs</h2>

      {posts.map(post => (
        <div
          key={post._id}
          style={{
            border: "1px solid #ccc",
            marginBottom: 20,
            padding: 15,
            borderRadius: 10,
          }}
        >
          <h3>{post.title}</h3>
          <p>{post.content}</p>

          <h4>Comments</h4>
          {post.comments.map((c, i) => (
            <p key={i}><b>{c.user}:</b> {c.text}</p>
          ))}

          {/* Comment input */}
          <input
            type="text"
            placeholder="Write a comment"
            value={comments[post._id] || ""}
            onChange={(e) =>
              setComments({ ...comments, [post._id]: e.target.value })
            }
          />

          <br /><br />

          <button onClick={() => addComment(post._id)}>Comment</button>
        </div>
      ))}
    </div>
  );
}
