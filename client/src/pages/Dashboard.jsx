import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://community-website-aitsp.onrender.com/api/posts")
      .then(res => setPosts(res.data.filter(post => post.status === "published")));

  }, []);
  const addComment = async (id) => {
  await axios.post(
    `https://community-website-aitsp.onrender.com/posts/${id}/comment`,
    {
      text: comment,
      user: localStorage.getItem("name")
    }
  );
  window.location.reload();
};


  return (
    <Wrapper>
        <Navbar/>
      <h2>Community Blogs</h2>
      <button onClick={() => navigate("/create")}>Create Post</button>

      {posts.map(post => (
  <div key={post._id} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 15 }}>
    <h3>{post.title}</h3>
    <p>{post.content}</p>

    <h4>Comments</h4>

    <input
      placeholder="Write a comment"
      onChange={(e) => setComment(e.target.value)}
    />

    <button onClick={() => addComment(post._id)}>
      Comment
    </button>

    {post.comments?.map((c, i) => (
      <p key={i}>
        <b>{c.user}:</b> {c.text}
      </p>
    ))}
  </div>
))}

    </Wrapper>
  );
}
