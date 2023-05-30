const dal = require("../data-access-layer/dal");

async function getAllTeamsAsync() {
    const sql = `SELECT * FROM teams`;
    const teams = await dal.executeAsync(sql);
    return teams;
}

module.exports = {
    getAllTeamsAsync
}