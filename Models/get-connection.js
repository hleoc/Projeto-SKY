const { MongoClient } = require('mongodb');
const DB = require("dotenv/config");

const DB_NAME = process.env.DB;
const MONGO_DB_URL = `mongodb://localhost:27017/${DB_NAME}`;

let connection;

const getCollection = async (collectionName) => {
  connection = connection || (await MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }));
  return connection.db(DB_NAME).collection(collectionName);
};

module.exports = getCollection;
