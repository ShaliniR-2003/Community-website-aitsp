import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/admin/users")
      .then(res => setUsers(res.data));

    axios.get("http://localhost:5000/admin/posts")
      .then(res => setPosts(res.data));

    axios.get("http://localhost:5000/admin/stats")
      .then(res => setStats(res.data));
  }, []);

  const suspendUser = (id) => {
    axios.put(`http://localhost:5000/admin/suspend/${id}`)
      .then(() => window.location.reload());
  };

  const deleteUser = (id) => {
    axios.delete(`http://localhost:5000/admin/user/${id}`)
      .then(() => window.location.reload());
  };

  const approvePost = (id) => {
    axios.put(`http://localhost:5000/admin/approve/${id}`)
      .then(() => window.location.reload());
  };

  const deletePost = (id) => {
    axios.delete(`http://localhost:5000/admin/post/${id}`)
      .then(() => window.location.reload());
  };

  return (
    <div style={{ padding: 20 }}>
      <Navbar />

      <h2>Admin Dashboard</h2>

      <h3>Statistics</h3>
      <p>Total Members: {stats.users}</p>
      <p>Total Posts: {stats.posts}</p>

      <h3>Members</h3>
      {users.map(u => (
        <div key={u._id} style={{ border: "1px solid gray", margin: 5, padding: 5 }}>
          {u.name} ({u.email})
          <button onClick={() => suspendUser(u._id)}>Suspend</button>
          <button onClick={() => deleteUser(u._id)}>Delete</button>
        </div>
      ))}

      <h3>Blog Posts</h3>
      {posts.map(p => (
        <div key={p._id} style={{ border: "1px solid gray", margin: 5, padding: 5 }}>
          <b>{p.title}</b> - {p.status}
          <button onClick={() => approvePost(p._id)}>Approve</button>
          <button onClick={() => deletePost(p._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
