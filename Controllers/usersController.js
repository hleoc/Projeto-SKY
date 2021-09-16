const { Router } = require("express");

const jwt = require("jsonwebtoken");

const APP_SECRET = require("dotenv/config");

const service = require("../Service/usersService");

const model = require("../Models/User");

const users = Router();

const SECRET = process.env.APP_SECRET;

const jwtConfig = {
  expiresIn: "30m",
  algorithm: "HS256",
};

users.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phones,
    } = req.body;
    const newUser = await service.create(name, email, password, phones);
    if (newUser.error) {
      return res.status(newUser.statusCode).json({ message: newUser.message });
    }

    const { password: _, ...userWithoutPassword } = newUser;
    const payload = {
      iss: "post_api",
      aud: "identify",
      userData: userWithoutPassword,
    };
    const token = jwt.sign(payload, SECRET, jwtConfig);

    res.status(201).json({ sucess: true, user: newUser, token });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

module.exports = users;
