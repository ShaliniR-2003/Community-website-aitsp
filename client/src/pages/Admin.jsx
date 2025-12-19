import axios from "axios";
import { useEffect, useState } from "react";

export default function Admin() {
  const [posts, setPosts] = useState([]);

  const loadPosts = () => {
    axios.get("http://localhost:5000/api/posts")
      .then(res => setPosts(res.data));
  };

  const deletePost = async (id) => {
    await axios.delete(`http://localhost:5000/api/posts/${id}`);
    loadPosts();
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>Total Posts: {posts.length}</h3>

      {posts.map(p => (
        <div key={p._id}>
          <h4>{p.title}</h4>
          <button onClick={() => deletePost(p._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
