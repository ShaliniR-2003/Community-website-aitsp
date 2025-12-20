import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div style={{ marginBottom: 20 }}>
      <button onClick={() => navigate("/dashboard")}>Blogs</button>
      <button onClick={() => navigate("/create")}>Create Post</button>
      <button onClick={() => navigate("/profile")}>My Profile</button>
      <button onClick={() => navigate("/members")}>Members</button>
      {localStorage.getItem("role") === "admin" && (
  <button onClick={() => navigate("/admin")}>Admin</button>
)}
<button onClick={() => navigate("/community")}>Community</button>
      <button onClick={() => navigate("/")}>Logout</button>
    </div>
  );
}
