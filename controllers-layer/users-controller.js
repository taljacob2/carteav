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

// Get user by username
router.get("/login/:username", async (request, response) => {
    try {
        const username = request.params.username;
        const user = await usersLogic.getUserByUsernameAsync(username);
        if (!user) {
            response.status(404).send("user not found.");
        }
        response.json(user);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.get("/isAdmin/:userId", async (request, response) => {
    const userId = +request.params.userId;
    response.status(200).send(userId === 1);
});

module.exports = router;