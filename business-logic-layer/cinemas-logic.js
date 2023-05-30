const dal = require("../data-access-layer/dal");

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

async function updateCinemaSeatAsync(cinemaId, seatNumber, userId) {
    if (!getIsCinemaSeatAvailableAsync(cinemaId, seatNumber)){
        return;
    }

    const sql = `UPDATE cinemas SET isFinished = 1
                 WHERE cartId = ?`;
    
    await dal.executeAsync(sql, cartId);

    // Get the updated cart
    const userCart = await getUpdatedUserCartAsync(cartId);
    return userCart;
}

module.exports = {
    getAllCinemasAsync,
}