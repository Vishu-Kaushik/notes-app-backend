const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./Routes/auth");
const notesRoutes = require("./Routes/notes");

const app = express();
const PORT = 4000;

dotenv.config();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(express.json());

try {
  mongoose.connect(process.env.MONGO_URL);
  console.log("connection successfull");
} catch (error) {
  console.log(error);
}

// creating a route
app.get("/", (req, res) => {
  res.send("server is running");
});

app.use("/auth", authRoutes);
app.use("/notes", notesRoutes);
app.use("/files", express.static("files"));

app.listen(PORT, () => {
  console.log(`Server is ruuning on port ${PORT}`);
});
