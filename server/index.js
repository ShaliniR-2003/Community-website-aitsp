const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
  res.send("Backend is running successfully");
});

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/users",require("./routes/users"));
app.use("/admin", require("./routes/admin"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port",PORT);
});
