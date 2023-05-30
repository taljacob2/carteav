global.config = require("./config.json");
const dotenv = require('dotenv');
const express = require("express");
const cors = require("cors");
const cinemasController = require("./controllers-layer/cinemas-controller");
const usersController = require("./controllers-layer/users-controller");
const logsController = require("./controllers-layer/logs-controller");
const threadDeleteSeatAfterTimer = require("./init-layer/thread-delete-seat-after-timer");

const server = express();

// Configure environment variables.
dotenv.config()

server.use(cors());
server.use(express.json());

server.use("/api/cinemas", cinemasController);
server.use("/api/users", usersController);
server.use("/api/logs", logsController);

server.listen(3001, () => console.log("Listening..."));

// Start thread.
await threadDeleteSeatAfterTimer.scanForOldUnaprovedSeatsAndDeleteThem();
