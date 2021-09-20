const { Router } = require("express");

const User = require("../Models/User");

const sessions = Router();

sessions.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ message: "All fields must be filled" });
    }

    const findEmail = await User.getByEmail({ email });

    if (!findEmail) {
      return res.status(401).json({ message: "Usuário e/ou senha inválidos" });
    }

    const findPassword = await User.getByPassword({ password });

    if (!findPassword) {
      return res.status(401).json({ message: "Usuário e/ou senha inválidos" });
    }

    res.status(200).json({ sucess: true, user: findEmail });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = sessions;
