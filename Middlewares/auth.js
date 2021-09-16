const jwt = require("jsonwebtoken");

const User = require("../Models/User");

const APP_SECRET = require("dotenv/config");

const SECRET = process.env.APP_SECRET;

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: "missing auth token" });
    const payload = jwt.verify(token, SECRET);
    const user = await User.getByEmail(payload.userData);

    if (!user) {
      return {
        error: true,
        code: "invalid_data",
        message: "invalid token",
        statusCode: 400,
      };
    }
    req.user = payload.userData;

    return next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};
