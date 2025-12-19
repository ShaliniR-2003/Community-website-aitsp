import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    await axios.post("http://localhost:5000/api/posts", {
      title,
      content,
      author: "Member"
    });
    navigate("/dashboard");
  };

  return (
    <div>
      <h2>Create Post</h2>
      <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Content" onChange={e => setContent(e.target.value)} />
      <button onClick={submit}>Publish</button>
    </div>
  );
}
