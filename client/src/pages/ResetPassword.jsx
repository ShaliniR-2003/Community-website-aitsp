import axios from "axios";
import { useState } from "react";
import Wrapper from "../components/Wrapper";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const reset = async () => {
    await axios.post("https://community-website-aitsp.onrender.com/api/auth/reset-password", {
      email,
      newPassword
    });
    alert("Password reset successful");
  };

  return (
    <Wrapper>
      <h2>Reset Password</h2>

      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input
        type="password"
        placeholder="New Password"
        onChange={e => setNewPassword(e.target.value)}
      />

      <button onClick={reset}>Reset</button>
    </Wrapper>
  );
}
