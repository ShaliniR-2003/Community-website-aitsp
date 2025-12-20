import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Wrapper from "../components/Wrapper";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    axios.get("https://community-website-aitsp.onrender.com/api/posts")
      .then(res => {
        const p = res.data.find(x => x._id === id);
        setPost(p);
      });
  }, []);

  const addComment = async () => {
    await axios.post(`https://community-website-aitsp.onrender.com/api/posts/comment/${id}`, {
      text: comment,
      user: "Member"
    });
    alert("Comment added");
  };

  if (!post) return null;

  return (
    <Wrapper>
      <h2>{post.title}</h2>
      <p>{post.content}</p>

      <h4>Comments</h4>
      {post.comments.map((c, i) => (
        <p key={i}>• {c.text}</p>
      ))}

      <input
        placeholder="Add comment"
        onChange={e => setComment(e.target.value)}
      />
      <button onClick={addComment}>Post</button>
    </Wrapper>
  );
}
