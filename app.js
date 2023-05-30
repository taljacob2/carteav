global.config = require("./config.json");
const express = require("express");
const cors = require("cors");
const meetingsController = require("./controllers-layer/meetings-controller");
const teamsController = require("./controllers-layer/teams-controller");

const server = express();

server.use(cors());
server.use(express.json());

server.use("/api/meetings", meetingsController);
server.use("/api/teams", teamsController);

server.listen(3001, () => console.log("Listening..."));