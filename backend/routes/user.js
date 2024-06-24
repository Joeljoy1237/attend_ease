const express = require("express");
const router = express.Router();
const {
  customError,
  successResponse,
  resMessages,
  abstractedTeacherData,
} = require("../utils/helpers");
const TeacherModel = require("../models/Teacher");
const bcrypt = require("bcrypt");
const ClassModel = require("../models/Class");
const Student = require("../models/Student");
const { mongoose } = require("mongoose");
const { verifyToken, verifyAdminToken } = require("../libs/Auth");
const { json } = require("body-parser");
const { ObjectId } = mongoose.Types;

//test api
router.get("/test", (req, res) => {
  console.log(req.ip);
  res.json("Admin route");
});

//Api to get user details
router.get("/getUserDetails", verifyToken, async (req, res) => {
  try {
    const userData = abstractedTeacherData(req.user);
    const response = successResponse({
      status: 200,
      message: "Here's your details",
      data: userData,
      accessToken: req.accessToken,
    });
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const status = error?.status || 500;
    const message = error?.message || "Internal Server Error";
    const description = error?.description;
    const errorMessage = customError({ resCode: status, message, description });
    return res.status(status).json(errorMessage);
  }
});

//Api to create new teacher (admin can't be manually created)
router.post("/createAdmin", verifyAdminToken,async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Validate input
    if (!firstName && !lastName && !email && !password) {
      throw { status: 400, message: "Please fill the required fields" };
    }

    // Detailed validation
    if (!firstName) {
      throw { status: 400, message: "First name is required" };
    } else if (!lastName) {
      throw { status: 400, message: "Last name is required" };
    } else if (!email) {
      throw { status: 400, message: "Email is required" };
    } else if (!password) {
      throw { status: 400, message: "Password is required" };
    }

    // Check if admin with same email exists
    const existingAdmin = await TeacherModel.findOne({ email });
    if (existingAdmin) {
      throw {
        status: 400,
        message: "Admin with this email already exists",
        description: "Please try another one.",
      };
    }

    // Encrypt password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create new admin
    const newAdmin = new TeacherModel({
      firstName,
      lastName,
      email,
      password: hashedPassword, // Store hashed password in database
    });
    await newAdmin.save();

    // Respond with success
    const response = successResponse({
      resCode: 201,
      message: resMessages.createdSuccessMessage,
    });
    return res.status(201).json(response);
  } catch (error) {
    console.error(error);
    const status = error?.status || 500;
    const message = error?.message || "Internal Server Error";
    const description = error?.description;
    const errorMessage = customError({ resCode: status, message, description });
    return res.status(status).json(errorMessage);
  }
});

//Api to create new class
router.post("/createClass",verifyAdminToken, async (req, res) => {
  try {
    const { className, classId } = req.body;

    // Validate input
    if (!className && !classId) {
      throw { status: 400, message: "Please fill the required fields" };
    }

    // Detailed validation
    if (!className) {
      throw { status: 400, message: "Class name is required" };
    } else if (!classId) {
      throw { status: 400, message: "Class id is required" };
    }

    // Check if admin with same email exists
    const existingClass = await ClassModel.findOne({ classId });
    if (existingClass) {
      throw {
        status: 400,
        message: "Class with this class id already exists",
        description: "Please try another one.",
      };
    }

    // Create new class
    const newClass = new ClassModel({
      classId,
      className,
    });
    await newClass.save();

    // Respond with success
    const response = successResponse({
      resCode: 201,
      message: "New class " + resMessages.createdSuccessMessage,
    });
    return res.status(201).json(response);
  } catch (error) {
    console.error(error);
    const status = error?.status || 500;
    const message = error?.message || "Internal Server Error";
    const description = error?.description;
    const errorMessage = customError({ resCode: status, message, description });
    return res.status(status).json(errorMessage);
  }
});

//Api to create new student
router.post("/createNewStudent", async (req, res) => {
  try {
    const { firstName, lastName, rollNo, classId } = req.body;

    //Validate Input
    if (!firstName && !lastName && !rollNo && !classId) {
      throw { status: 400, message: "Please fill the required fields" };
    }

    // Detailed validation
    if (!firstName) {
      throw { status: 400, message: "First name is required" };
    } else if (!lastName) {
      throw { status: 400, message: "Last name is required" };
    } else if (!rollNo) {
      throw { status: 400, message: "Roll number is required" };
    } else if (!classId) {
      throw {
        status: 400,
        message: "Class id not found.",
        description: "Please refresh the page and try",
      };
    } else if (!ObjectId.isValid(classId)) {
      throw {
        status: 400,
        message: "Class id is not valid",
        description: "Please refresh the page and try",
      };
    }

    // Check if student with the same admission number exists
    const existingStudent = await Student.findOne({ rollNo });
    if (existingStudent) {
      throw {
        status: 409,
        message: "Student with this admission number already exists",
        description: "Please try another one",
      };
    }

    // Create new student
    const newStudent = new Student({
      firstName,
      lastName,
      rollNo,
      class: classId,
    });
    await newStudent.save();

    const response = successResponse({
      resCode: 201,
      message: "New student data " + resMessages.createdSuccessMessage,
      data: newStudent,
    });
    return res.status(201).json(response);
  } catch (error) {
    console.error(error);
    const status = error?.status || 500;
    const message = error?.message || "Internal Server Error";
    const description = error?.description;
    const errorMessage = customError({ resCode: status, message, description });
    return res.status(status).json(errorMessage);
  }
});

module.exports = router;
