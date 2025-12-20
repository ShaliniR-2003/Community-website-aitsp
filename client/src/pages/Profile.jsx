import axios from "axios";
import { useState } from "react";
import Wrapper from "../components/Wrapper";
import Navbar from "../components/Navbar";

export default function Profile() {
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState("");
  const [visibility, setVisibility] = useState("public");

  const updateProfile = async () => {
    const userId = localStorage.getItem("userId"); // store during login later
    await axios.put(`https://community-website-aitsp.onrender.com/api/users/${userId}`, {
      bio,
      photo,
      visibility
    });
    alert("Profile updated");
  };

  return (
    <Wrapper>
        <Navbar/>
      <h2>My Profile</h2>
      <h4>Name: {localStorage.getItem("name")}</h4>
<h4>Email: {localStorage.getItem("email")}</h4>



      <input
        placeholder="Profile Photo URL"
        onChange={e => setPhoto(e.target.value)}
      />

      <textarea
        placeholder="Bio"
        onChange={e => setBio(e.target.value)}
      />

      <select onChange={e => setVisibility(e.target.value)}>
        <option value="public">Public</option>
        <option value="private">Private</option>
      </select>

      <br /><br />
      <button onClick={updateProfile}>Save</button>
    </Wrapper>
  );
}
