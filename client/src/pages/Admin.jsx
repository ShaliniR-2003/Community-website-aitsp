import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState({users: 0,posts: 0});

  useEffect(() => {
    // Get users
    axios.get("https://community-website-aitsp-1.onrender.com/admin/users")
      .then(res => setUsers(res.data));
    // Get posts
    axios.get("https://community-website-aitsp-1.onrender.com/admin/posts")
      .then(res => setPosts(res.data))
      .catch(err => console.log(err));
    // Get stats
    axios.get("https://community-website-aitsp-1.onrender.com/admin/stats")
      .then(res => setStats(res.data));
  }, []);

  const approvePost = async (id) => {
  try {
    await axios.put(`https://community-website-aitsp-1.onrender.com/admin/approve/${id}`);
    const res = await axios.get("https://community-website-aitsp-1.onrender.com/admin/posts");
    setPosts(res.data);
    alert("Post approved!");
  } catch (err) {
    console.log(err);
    alert("Failed to approve post");
  }
};

const deletePost = async (id) => {
  try {
    await axios.delete(`https://community-website-aitsp-1.onrender.com/admin/post/${id}`);
    const res = await axios.get("https://community-website-aitsp-1.onrender.com/admin/posts");
    setPosts(res.data);
    alert("Post deleted!");
  } catch (err) {
    console.log(err);
    alert("Failed to delete post");
  }
};

const suspendUser = async (id) => {
  try {
    await axios.put(`https://community-website-aitsp-1.onrender.com/admin/suspend/${id}`);
    const res = await axios.get("https://community-website-aitsp-1.onrender.com/admin/users");
    setUsers(res.data);
    alert("User suspended!");
  } catch (err) {
    console.log(err);
    alert("Failed to suspend user");
  }
};

const deleteUser = async (id) => {
  try {
    await axios.delete(`https://community-website-aitsp-1.onrender.com/admin/user/${id}`);
    const res = await axios.get("https://community-website-aitsp-1.onrender.com/admin/users");
    setUsers(res.data);
    alert("User deleted!");
  } catch (err) {
    console.log(err);
    alert("Failed to delete user");
  }
};

  return (
  <div style={{ padding: 20 }}>
    <h2>Admin Dashboard</h2>

    <h3>Statistics</h3>
    <p>Total Members: {stats.users}</p>
    <p>Total Posts: {stats.posts}</p>

    <hr />

    <h3>Users</h3>
    {users.map(u => (
      <div key={u._id} style={{ marginBottom: 10 }}>
        <b>{u.name}</b> - {u.email} {u.suspended && "(Suspended)"}
        {!u.suspended && (
          <button onClick={() => suspendUser(u._id)}>Suspend</button>
        )}
        <button onClick={() => deleteUser(u._id)}>Delete</button>
      </div>
    ))}

    <hr />

    <h3>Posts</h3>
    {posts.map(p => (
      <div key={p._id} style={{ marginBottom: 10 }}>
        <b>{p.title}</b> ({p.status})
        {p.status !== "published" && (
          <button onClick={() => approvePost(p._id)}>Approve</button>
        )}
        <button onClick={() => deletePost(p._id)}>Delete</button>
      </div>
    ))}
  </div>
)};
