const express = require("express");
const dotenv = require("dotenv");
const User = require("../Models/user");
const bcrypt = require("bcrypt");
const multer = require("multer");
const cloudinary = require("cloudinary");

dotenv.config();

const router = express.Router();

const storage = multer.memoryStorage();
var upload = multer({
  storage: storage,
});

// Signup Route
const signup = async (req, res) => {
  try {
    const { firstName, lastName, userBio, userEmail, userMobile, userName } =
      req.body;

    // If current user exists

    const existingUser = await User.findOne({ userEmail });
    if (existingUser) {
      res.status(401).send("User Already Exists with this Email");
    }

    // Check if file is provided
    if (!req.file) {
      return res.status(400).json({ error: "No Profile Image Provided" });
    }

    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(result);
    
  } catch (error) {

  }
};
