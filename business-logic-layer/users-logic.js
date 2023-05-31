const dal = require("../data-access-layer/dal");

async function getAllUsersAsync() {
    const sql = `SELECT * FROM users`;
    
    const users = await dal.executeAsync(sql);
    return users;
}

async function getUserByUsernameAsync(username) {
    const sql = `SELECT * FROM users WHERE username = '${username}'`;
    
    const users = await dal.executeAsync(sql);
    return users[0];
}

async function addUserAsync(user) {
    if (await getUserByUsernameAsync(user.username)) {
        throw new Error("username has already been taken.");
    }

    const sql = `INSERT INTO users VALUES (DEFAULT,
                 '${user.username}'
                  );`
    
    const info = await dal.executeAsync(sql);
    user.id = info.insertId;

    return user;
}

async function getAllLogsOfUser(userId) {
    const sql = `SELECT value, timestamp AS "time of purchase", approved, seatNumber, (SELECT time FROM cinemas WHERE id = cinemaId) AS "cinema time"
                 FROM logs 
                 WHERE userid = ${userId}
                 ORDER BY timestamp DESC`;
    
    const userLogs = await dal.executeAsync(sql);
    return userLogs;    
}

module.exports = {
    getAllUsersAsync,
    getUserByUsernameAsync,
    addUserAsync,
    getAllLogsOfUser
}