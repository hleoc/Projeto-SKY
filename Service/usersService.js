const jwt = require("jsonwebtoken");

const APP_SECRET = require("dotenv/config");

const emailMiddleware = require("../Middlewares/emailMiddleware");

const model = require("../Models/User");

const SECRET = process.env.APP_SECRET;

const jwtConfig = {
  expiresIn: "30m",
  algorithm: "HS256",
};

const create = async (name, email, password, phones) => {
  const emailExists = await model.getByEmail({ email });
  const validatEmail = emailMiddleware.validateEmail({ email });
  if (!name || !email || !password || !phones) {
    return {
      error: true,
      code: "invalid_data",
      message: "Invalid entries. Try again.",
      statusCode: 400,
    };
  }
  if (emailExists) {
    return {
      error: true,
      code: "duplicate",
      message: "E-mail já existente",
      statusCode: 409,
    };
  }
  if (!validatEmail) {
    return {
      error: true,
      code: "invalid_data",
      message: "Invalid entries. Try again.",
      statusCode: 400,
    };
  }
  
    const payload = {
      iss: "post_api",
      aud: "identify",
    };
    const token = jwt.sign(payload, SECRET, jwtConfig);

  return model.create(name, email, password, phones, token);
};

module.exports = {
  create,
};
