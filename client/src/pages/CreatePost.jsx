import { useState } from "react";
import axios from "axios";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const savePost = async (status) => {
    await axios.post("https://community-website-aitsp-1.onrender.com/api/posts", {
      title,
      content,
      status,
      author: localStorage.getItem("name")
    });

    alert(status === "draft" ? "Saved as Draft" : "Published");
  };

  return (
    <div style={{ padding: 20, border: "1px solid #ccc", borderRadius: 10 }}>
      <h2>Create Blog</h2>

      <input
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Content"
        onChange={(e) => setContent(e.target.value)}
      />

      <br /><br />

      <button onClick={() => savePost("draft")}>
        Save as Draft
      </button>

      <button onClick={() => savePost("published")}>
        Publish
      </button>
    </div>
  );
}
