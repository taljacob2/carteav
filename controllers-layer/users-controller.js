const express = require("express");

const usersLogic = require("../business-logic-layer/users-logic");

const router = express.Router();

// Get all
router.get("/", async (request, response) => {
    try {
        const users = await usersLogic.getAllUsersAsync();
        response.json(users);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// Add User
router.post("/", async (request, response) => {
    try {
        const user = request.body;
        const addedUser = await usersLogic.addUserAsync(user);
        response.status(201).send(addedUser);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// // Get Meetings by Team Id
// router.get("/:teamId", async (request, response) => {
//     try {
//         const teamId = +request.params.teamId;
//         const meetings = await meetingsLogic.getMeetingsByTeamAsync(teamId);
//         response.json(meetings);
//     }
//     catch (err) {
//         response.status(500).send(err.message);
//     }
// });


module.exports = router;