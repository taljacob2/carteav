const dal = require("../data-access-layer/dal");

async function getAllMeetingsAsync() {
    const sql = `SELECT meetingId, T.team, startDate, endDate, description, room
                 FROM meetings AS M LEFT JOIN teams as T
                 ON M.teamId = T.teamId`;
    
    const meetings = await dal.executeAsync(sql);
    return meetings;
}

async function getMeetingsByTeamAsync(teamId) {
    const sql = `SELECT meetingId, T.team, startDate, endDate, description, room
                 FROM meetings AS M LEFT JOIN teams AS T
                 ON M.teamId = T.teamId
                 WHERE T.teamId = ${teamId}`;
    const meetings = await dal.executeAsync(sql);
    return meetings;
}



async function addMeetingAsync(meeting) {
    const sql = `INSERT INTO meetings VALUES (DEFAULT,
                 '${meeting.teamId}',
                 '${meeting.startDate}',
                 '${meeting.endDate}',
                 '${meeting.description}',
                 '${meeting.room}'
                  );`
    
    const info = await dal.executeAsync(sql);
    meeting.meetingId = info.insertId;

    meeting.team = await getTeamAsync(meeting.teamId);
    return meeting;
}

// Internal Function
async function getTeamAsync(teamId) {
    const sql = `SELECT team FROM teams WHERE teamId = ${teamId}`;
    const team = await dal.executeAsync(sql);
    return team[0].team;
}

module.exports = {
    getAllMeetingsAsync,
    getMeetingsByTeamAsync,
    getTeamAsync,
    addMeetingAsync
}