const express = require("express");
const APP_PORT = require("dotenv/config");

const app = express();
app.use(express.json());

const port = process.env.APP_PORT;

app.get("/", (_req, res) => res.send("Hello SKY"));

app.listen(port, () => console.log(`Back-end started on localhost:${port}! 🚀`));
