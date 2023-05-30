const express = require("express");
const teamsLogic = require("../business-logic-layer/teams-logic");

const router = express.Router();

router.get("/", async (request, response) => {
    try {
        const teams = await teamsLogic.getAllTeamsAsync();
        response.json(teams);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


module.exports = router;