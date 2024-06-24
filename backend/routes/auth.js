const express = require("express");
const Teacher = require("../models/Teacher");
const {
  resMessages,
  roles,
  successResponse,
  customError,
} = require("../utils/helpers");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

//Login Api
router.post("/login", async (req, res) => {
  console.log(req.body);
  console.log(req.ip);
  const userIpAddress = req.ip;
  try {
    const { email, password } = req.body;

    if (!email && !password) {
      throw { status: 400, message: "Please fill the required fields" };
    }

    if (!email) {
      throw { status: 400, message: "Email field is required" };
    } else if (!password) {
      throw { status: 400, message: "Password field is required" };
    }

    const user = await Teacher.findOne({ email });
    console.log(user);
    if (!user) {
      throw { status: 404, message: resMessages.userNotfoundMessage };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw { status: 400, message: "Invalid username or password" };
    }

    await user.save();

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id,
        role: user?.isAdmin ? "admin" : "teacher",
      },
      process.env.SECRET_KEY,
      { expiresIn: "1w" }
    );

    const response = successResponse({
      message: resMessages.AuthSuccessMessage,
      role: user?.isAdmin ? "admin" : "teacher",
      accessToken: token,
    });
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Internal Server Error";
    const description = error.description;
    const errorMessage = customError({
      resCode: status,
      message,
      description,
      userIpAddress,
    });
    return res.status(status).json(errorMessage);
  }
});

module.exports = router;
