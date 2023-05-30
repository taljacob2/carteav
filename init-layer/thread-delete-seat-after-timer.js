const cinemasLogic = require("../business-logic-layer/cinemas-logic");
const logsLogic = require("../business-logic-layer/logs-logic");

let scanForOldUnaprovedSeatsAndDeleteThem =  async () => {
        try {
            const cinemas = await cinemasLogic.getAllCinemasAsync();
            cinemas.forEach(async (cinema) => {
                for (let index = 0; index < 4; index++) {
                    const logId = cinema[`seat${index + 1}`];
                    if (!logId) {
                        continue;
                    }
                    const log = await logsLogic.getLogByIdAsync(logId);        
                    if (new Date().getTime() - new Date(log?.timestamp)?.getTime() > 15 * 60 * 1000 && !log?.approved) {
                        try {
                            await logsLogic.updateLogValueAsync(logId, "The seat wasn't approved in the limited time");
                            const updatedCinema = await cinemasLogic.updateCinemaSeatAsNullAsync(cinema.id, `seat${index + 1}`);
                            if (!updatedCinema) {
                                console.error(`unexpected error occured`);
                                return;
                            }
                        }
                        catch (err) {
                            console.error(err.message);
                        }
                    }
                }                
            });
        }
        catch (err) {
            console.error(err.message);
        }
}

module.exports = {
    scanForOldUnaprovedSeatsAndDeleteThem
}