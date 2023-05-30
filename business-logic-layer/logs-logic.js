const dal = require("../data-access-layer/dal");

async function getAllLogsAsync() {
    const sql = `SELECT * FROM logs`;
    
    const logs = await dal.executeAsync(sql);
    return logs;
}

async function getLogByIdAsync(logId) {
    const sql = `SELECT * FROM logs
                 WHERE id = ${logId}`;
    
    const logs = await dal.executeAsync(sql);
    return logs[0];
}

async function addLogAsync(log) {
    const sql = `INSERT INTO logs VALUES (DEFAULT,
                 '${log.userId}',
                 '${log.value}',
                 '${log.timestamp}'
                  );`
    
    const info = await dal.executeAsync(sql);
    log.id = info.insertId;

    return log;
}

module.exports = {
    getAllLogsAsync,
    getLogByIdAsync,
    addLogAsync
}