const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./Routes/auth");    

const app = express();
const PORT = 6969;

dotenv.config();
app.use(cors());
app.use(bodyParser.json());

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

app.listen(PORT, () => {
  console.log(`Server is ruuning on port ${PORT}`);
});
