const dal = require("../data-access-layer/dal");

async function getAllCinemasAsync() {
    const sql = `SELECT * FROM cinemas`;
    
    const cinemas = await dal.executeAsync(sql);
    return cinemas;
}

module.exports = {
    getAllCinemasAsync,
}