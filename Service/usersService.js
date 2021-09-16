const emailMiddleware = require("../Middlewares/emailMiddleware");

const model = require("../Models/User");

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

  return model.create(name, email, password, phones);
};

module.exports = {
  create,
};
