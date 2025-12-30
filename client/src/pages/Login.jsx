import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Wrapper from "../components/Wrapper";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      // Make login request
      const res = await axios.post("https://community-website-aitsp-1.onrender.com/api/auth/login", {
        email,
        password
      });

      // Save user info in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("userId", res.data.id);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("email", res.data.email);

      // Redirect based on role
      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      console.log(err);
      if (err.response) {
        alert(err.response.data); // Show error from backend
      } else {
        alert("Login failed");
      }
    }
  };

  return (
    <Wrapper>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>

      <p onClick={() => navigate("/register")}>Register</p>
      <p onClick={() => navigate("/reset")}>Forgot Password?</p>
    </Wrapper>
  );
}
