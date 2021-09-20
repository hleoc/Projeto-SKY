const getCollection = require("./get-connection");

const formatDate = require("../Middlewares/formatDate");

const getByEmail = async ({ email }) =>
  getCollection("users").then((emai) => emai.findOne({ email }));

const getByPassword = async ({ password }) =>
  getCollection("users").then((pass) => pass.findOne({ password }));


const create = async (name, email, password, phones, token) =>
  getCollection("users")
    .then((user) =>
      user.insertOne({
        name,
        email,
        password,
        phones,
        token,
        creationDate: formatDate.dataAtualFormatada(),
        updateDate: formatDate.dataAtualFormatada(),
        lastLogin: formatDate.dataAtualFormatada(),
      }),
    )
    .then((result) => ({
      _id: result.insertedId,
      name,
      email,
      phones,
      token,
      creationDate: formatDate.dataAtualFormatada(),
      updateDate: formatDate.dataAtualFormatada(),
      lastLogin: formatDate.dataAtualFormatada(),
    }));

module.exports = {
  getByEmail,
  getByPassword,
  create,
};
