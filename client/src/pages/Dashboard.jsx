import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/posts")
      .then(res => setPosts(res.data));
  }, []);

  return (
    <div>
      <h2>Community Blogs</h2>
      <button onClick={() => navigate("/create")}>Create Post</button>

      {posts.map(p => (
        <div key={p._id} style={{ border: "1px solid gray", margin: 10 }}>
          <h3>{p.title}</h3>
          <p>{p.content}</p>
          <small>By {p.author}</small>
        </div>
      ))}
    </div>
  );
}
