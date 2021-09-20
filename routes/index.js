const Router = require("express");

const usersController = require("../Controllers/usersController");
const sessionsController = require("../Controllers/sessionsController");

const routes = Router();

routes.use("/users", usersController);
routes.use("/sessions", sessionsController);

module.exports = routes;
