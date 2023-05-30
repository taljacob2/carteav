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
    const sql = `INSERT INTO users VALUES (DEFAULT,
                 '${user.username}'
                  );`
    
    const info = await dal.executeAsync(sql);
    user.id = info.insertId;

    return user;
}

module.exports = {
    getAllUsersAsync,
    getUserByUsernameAsync,
    addUserAsync
}