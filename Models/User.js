const getCollection = require("./get-connection");

const formatDate = require("../Middlewares/formatDate");

const getByEmail = async ({ email }) =>
  getCollection("users").then((emai) => emai.findOne({ email }));

const create = async (name, email, password, phones) =>
  getCollection("users")
    .then((user) =>
      user.insertOne({
        name,
        email,
        password,
        phones,
        creationDate: formatDate.dataAtualFormatada(),
        updateDate: formatDate.dataAtualFormatada(),
        lastLogin: formatDate.dataAtualFormatada(),
      }),
    )
    .then((result) => ({
      _id: result.insertedId,
      name,
      email,
      password,
      phones,
      creationDate: formatDate.dataAtualFormatada(),
      updateDate: formatDate.dataAtualFormatada(),
      lastLogin: formatDate.dataAtualFormatada(),
    }));

const updateNewUser = async ({newUser, token}) => {
  getCollection("users").then((user) => user.updateOne({ $set: { newUser, token } }));

  return {
    ...newUser,
    token,
  };
};

module.exports = {
  getByEmail,
  create,
  updateNewUser,
};