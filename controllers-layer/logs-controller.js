const express = require("express");
const logsLogic = require("../business-logic-layer/logs-logic");

const router = express.Router();

router.get("/:logId", async (request, response) => {
    try {
        const logId = +request.params.logId;
        const logs = await logsLogic.getLogByIdAsync(logId);
        response.json(logs);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.put("/updateLogValue/declined/:logId", async (request, response) => {
    try {
        const logId = +request.params.logId;
        const logs = await logsLogic.updateLogValueAsync(logId, "admin declined");
        response.json(logs);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// router.put("/updateLogValue/declined", async (request, response) => {
//     try {
//         const requestBody = request.body;
//         const logs = await logsLogic.updateLogValueAsync(requestBody.logId, "admin declined");
//         response.json(logs);
//     }
//     catch (err) {
//         response.status(500).send(err.message);
//     }
// });

// router.put("updateLogValue/approved", async (request, response) => {
//     try {
//         const requestBody = request.body;
//         const logs = await logsLogic.updateLogValueAsync(requestBody.logId, "admin approved");
//         response.json(logs);
//     }
//     catch (err) {
//         response.status(500).send(err.message);
//     }
// });

router.put("/updateLogValue/approved/:logId", async (request, response) => {
    try {
        const logId = +request.params.logId;
        console.log(logId);
        const logs = await logsLogic.updateLogValueAsync(logId, "admin approved");
        response.json(logs);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


module.exports = router;