global.config = require("./config.json");
const dotenv = require('dotenv');
const express = require("express");
const cors = require("cors");
const cinemasController = require("./controllers-layer/cinemas-controller");
const usersController = require("./controllers-layer/users-controller");

const server = express();

// Configure environment variables.
dotenv.config()

server.use(cors());
server.use(express.json());

server.use("/api/cinemas", cinemasController);
server.use("/api/users", usersController);

server.listen(3001, () => console.log("Listening..."));