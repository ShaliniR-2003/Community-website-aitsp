import axios from "axios";
import { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import Navbar from "../components/Navbar";

export default function Members() {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("https://community-website-aitsp.onrender.com/api/users")
      .then(res => setMembers(res.data));
  }, []);

  const filtered = members.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Wrapper>
        <Navbar/>
      <h2>Community Members</h2>

      <input
        placeholder="Search members"
        onChange={e => setSearch(e.target.value)}
      />

      {filtered.map(m => (
        <div key={m._id} style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
          <img src={m.photo} width="50" />
          <h4>{m.name}</h4>
          <p>{m.bio}</p>
        </div>
      ))}
    </Wrapper>
  );
}
