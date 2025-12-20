import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Wrapper from "../components/Wrapper";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    await axios.post("http://localhost:5000/api/auth/register", {
      name,
      email,
      password
    });
    navigate("/");
  };

  return (
    <Wrapper>
      <h2>Register</h2>
      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={register}>Register</button>
    </Wrapper>
  );
}
