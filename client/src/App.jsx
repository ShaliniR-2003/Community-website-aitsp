import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreatePost from "./pages/CreatePost";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import Members from "./pages/Members";
import ResetPassword from "./pages/ResetPassword";
import PostDetails from "./pages/PostDetails";
import AdminDashboard from "./pages/AdminDashboard";
import Community from "./pages/Community";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset" element={<ResetPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create" element={<CreatePost />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/members" element={<Members />} />
      <Route path="/post/:id" element={<PostDetails />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/community" element={<Community />} />

    </Routes>
  );
}

export default App;
