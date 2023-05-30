global.config = require("./config.json");
const dotenv = require('dotenv');
const express = require("express");
const cors = require("cors");
const meetingsController = require("./controllers-layer/meetings-controller");
const teamsController = require("./controllers-layer/teams-controller");

const server = express();

// Configure environment variables.
dotenv.config()

server.use(cors());
server.use(express.json());

server.use("/api/meetings", meetingsController);
server.use("/api/teams", teamsController);

server.listen(3001, () => console.log("Listening..."));