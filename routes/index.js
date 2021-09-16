const Router = require("express");

const usersController = require("../Controllers/usersController");

const routes = Router();

routes.use("/users", usersController);

module.exports = routes;
