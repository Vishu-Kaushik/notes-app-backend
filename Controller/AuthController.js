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

    const password = req.body.userPassword;
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const encryptedPassword = await bcrypt.hash(password, salt);
    console.log("Request Body:  ", req.body);

    const newUser = new User({
      firstName,
      lastName,
      userBio,
      userEmail,
      userName,
      userMobile,
      userPassword: encryptedPassword,
      profileImage: result.secure_url,
    });

    await newUser.save();

    return res.status(200).json({
      status: "OK",
      user: newUser,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;

    const alreadyUser = await User.findOne({ userEmail });
    if (alreadyUser) {
      const passwordMatch = await bcrypt.compare(
        userPassword,
        alreadyUser.userPassword
      );
      if (passwordMatch) {
        return res.json(alreadyUser);
      } else {
        return res.json({ status: "Error", getuser: false });
      }
    } else {
      return res.json({ status: "Error", getuser: false });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signup, login };
