const { Router } = require("express");

const { classToClass } = require("class-transformer");

const service = require("../Service/usersService");

const model = require("../Models/User");

const users = Router();

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

    res.status(201).json({ sucess: true, user: classToClass(newUser) });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = users;
