const dal = require("../data-access-layer/dal");
const logsLogic = require("../business-logic-layer/logs-logic");

async function getAllCinemasAsync() {
    const sql = `SELECT * FROM cinemas`;
    
    const cinemas = await dal.executeAsync(sql);
    return cinemas;
}

async function getIsCinemaSeatAvailableAsync(cinemaId, seatNumber) {
    const sql = `SELECT * FROM cinemas WHERE ${seatNumber} IS NULL AND id = ${cinemaId}`;
    
    const cinemas = await dal.executeAsync(sql);
    return cinemas.length;
}

async function getCinemaByIdAsync(cinemaId) {
    const sql = `SELECT * FROM cinemas
                 WHERE id = ${cinemaId}`;
    
    const cinemas = await dal.executeAsync(sql);
    return cinemas[0];
}

async function updateCinemaSeatAsync(cinemaId, seatNumber, userId) {
    if (!getIsCinemaSeatAvailableAsync(cinemaId, seatNumber)){
        throw new Error("seat is unavailable");
    }

    const newLog = await logsLogic.addLogAsync({
        userId,
        value: "waiting for approval",
        timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
        seatNumber: seatNumber
    })

    const sql = `UPDATE cinemas SET ${seatNumber} = ${newLog.id}
                 WHERE id = ${cinemaId}`;
    
    await dal.executeAsync(sql);

    // Get the updated cinema
    const updatedCinema = await getCinemaByIdAsync(cinemaId);
    return updatedCinema;
}

async function updateCinemaSeatAsNullAsync(cinemaId, seatNumber) {
    const sql = `UPDATE cinemas SET ${seatNumber} = NULL
                 WHERE id = ${cinemaId}`;
    
    await dal.executeAsync(sql);

    // Get the updated cinema
    const updatedCinema = await getCinemaByIdAsync(cinemaId);
    return updatedCinema;
}

async function findLogIdSeatNumberInAllCinemasAndUpdateSeatAsNullAsync(logId, seatNumber) {
    const sql = `SELECT * FROM cinemas WHERE ${seatNumber} = ${logId}`;
    
    const cinema = await dal.executeAsync(sql);
    if (!cinema) {
        return;
    }

    await updateCinemaSeatAsNullAsync(cinema.id, seatNumber);
}

module.exports = {
    getAllCinemasAsync,
    updateCinemaSeatAsync,
    getCinemaByIdAsync,
    updateCinemaSeatAsNullAsync,
    findLogIdSeatNumberInAllCinemasAndUpdateSeatAsNullAsync
}