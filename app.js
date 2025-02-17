const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

require("./conn/conn");
const auth = require("./routes/auth");
const list = require("./routes/list");

// CORS configuration


app.use(cors());
app.use(express.json());

app.use("/api/v1", auth);
app.use("/api/v2", list);

app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "frontend", "build")));
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

app.listen(1000, () => {
  console.log("Server Started");
});
