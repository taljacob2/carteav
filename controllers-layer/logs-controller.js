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


module.exports = router;