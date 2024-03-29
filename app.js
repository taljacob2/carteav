const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand')
const express = require("express");
const cors = require("cors");
const cinemasController = require("./controllers-layer/cinemas-controller");
const usersController = require("./controllers-layer/users-controller");
const logsController = require("./controllers-layer/logs-controller");
const threadDeleteSeatAfterTimer = require("./init-layer/thread-delete-seat-after-timer");

const server = express();

// Configure environment variables.
dotenvExpand.expand(dotenv.config())

server.use(cors());
server.use(express.json());

// Route to "static" directory.
server.use(express.static('static'));

// Define main router. Main page.
server.get('/', (req, res) => {
    res.sendFile('./static/index.html', { root: __dirname })
})

server.use("/api/cinemas", cinemasController);
server.use("/api/users", usersController);
server.use("/api/logs", logsController);

server.listen(process.env.NODE_PORT, () => console.log("Listening..."));

// Start thread.
setInterval(threadDeleteSeatAfterTimer.scanForOldUnaprovedSeatsAndDeleteThem, 1000 * 5)
