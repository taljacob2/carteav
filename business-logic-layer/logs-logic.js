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
    const logApproved = 0;
    const sql = `INSERT INTO logs VALUES (DEFAULT,
                 '${log.userId}',
                 '${log.value}',
                 '${log.timestamp}',
                 '${logApproved}',
                 '${log.seatNumber}'
                  );`
    
    const info = await dal.executeAsync(sql);
    log.id = info.insertId;

    return log;
}

async function updateLogAsApprovedByLogIdAsync(logId) {
    const sql = `UPDATE logs SET approved = 1
                 WHERE id = ${logId}`;
    
    await dal.executeAsync(sql);

    // Get the updated 
    const updatedLog = await getLogByIdAsync(logId);
    return updatedLog;
}

async function updateLogValueAsync(logId, logValue) {
    console.log(logId);
    console.log(logValue);
    const sql = `UPDATE logs SET value = '${logValue}'
                 WHERE id = ${logId}`;
    
    await dal.executeAsync(sql);

    // Get the updated 
    const updatedLog = await getLogByIdAsync(logId);
    return updatedLog;
}

module.exports = {
    getAllLogsAsync,
    getLogByIdAsync,
    addLogAsync,
    updateLogAsApprovedByLogIdAsync,
    updateLogValueAsync
}