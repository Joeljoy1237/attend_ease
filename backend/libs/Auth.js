const Teacher = require("../models/Teacher");
const { resMessages, customError } = require("../utils/helpers");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const verifyAdminToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw { status: 403, message: resMessages.tokenNotFoundMessage };
    }
    let token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw { status: 403, message: resMessages.tokenNotFoundMessage };
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(token);
    const user = await Teacher.findOne({ _id: decoded.userId });
    console.log("Requesting user is => \n", user);

    if (!user) {
      throw { status: 403, message: resMessages.accessDeniedMessage };
    }
    if (decoded.email !== user?.email && decoded.role !== "admin") {
      throw { status: 401, message: resMessages.unAuthorizedAccessMessage };
    }
    if (decoded.role === "admin" && user?.role === "admin") {
      req.userId = decoded?.userId;
      req.accessToken = token;
      req.user = user;
      next();
    } else {
      throw { status: 401, message: resMessages.unAuthorizedAccessMessage };
    }
  } catch (error) {
    console.log(error);
    if (error.name === "TokenExpiredError") {
      const errorMessage = customError({
        resCode: 2215,
        message: resMessages.sessionExpiredMessage,
        description: "Please login again to continue.",
      });
      return res.status(401).json(errorMessage);
    }
    const status = error.status || 500;
    const message = error.message || "Internal Server Error";
    const errorMessage = customError({ resCode: status, message });
    return res.status(status).json(errorMessage);
  }
};

const verifyToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw { status: 403, message: resMessages.tokenNotFoundMessage };
    }
    let token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw { status: 403, message: resMessages.tokenNotFoundMessage };
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(token);
    const user = await Teacher.findOne({ _id: decoded.userId });
    console.log("Requesting user is => \n", user);

    if (!user) {
      throw { status: 403, message: resMessages.accessDeniedMessage };
    }
    if (decoded.email !== user?.email) {
      throw { status: 401, message: resMessages.unAuthorizedAccessMessage };
    }
    if (decoded.email === user?.email) {
      req.userId = decoded?.userId;
      req.accessToken = token;
      req.user = user;
      next();
    }
  } catch (error) {
    console.log(error);
    if (error.name === "TokenExpiredError") {
      const errorMessage = customError({
        resCode: 2215,
        message: resMessages.sessionExpiredMessage,
        description: "Please login again to continue.",
      });
      return res.status(401).json(errorMessage);
    }
    const status = error.status || 500;
    const message = error.message || "Internal Server Error";
    const errorMessage = customError({ resCode: status, message });
    return res.status(status).json(errorMessage);
  }
};

module.exports = {
  verifyAdminToken,
  verifyToken,
};
