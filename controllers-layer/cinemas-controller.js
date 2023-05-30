const express = require("express");

const cinemasLogic = require("../business-logic-layer/cinemas-logic");

const router = express.Router();

// Get all
router.get("/", async (request, response) => {
    try {
        const cinemas = await cinemasLogic.getAllCinemasAsync();
        response.json(cinemas);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.put("/updateSeat", async (request, response) => {
    try {
        const requestBody = request.body;

        const updatedCinema = await cinemasLogic.updateCinemaSeatAsync(requestBody.cinemaId, requestBody.seatNumber, requestBody.userId);
        if (!updatedCinema) {
            response.status(404).send(`${requestBody.seat} is unavailable.`);
            return;
        }
        response.json(updatedCinema);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// // Add Meeting
// router.post("/", async (request, response) => {
//     try {
//         const meeting = request.body;
//         const addedMeeting = await meetingsLogic.addMeetingAsync(meeting);
//         response.status(201).send(addedMeeting);
//     }
//     catch (err) {
//         response.status(500).send(err.message);
//     }
// });

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