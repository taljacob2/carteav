const cinemasLogic = require("../business-logic-layer/cinemas-logic");
const logsLogic = require("../business-logic-layer/logs-logic");

let scanForOldUnaprovedSeatsAndDeleteThem =  async () => {
        try {
            const cinemas = await cinemasLogic.getAllCinemasAsync();
            cinemas.forEach(async (cinema) => {
                for (let index = 0; index < 4; index++) {                    
                    // console.log(cinema)
                    // console.log(cinema.seat1)
                    // console.log(`seat${index + 1}`)
                    const logId = cinema[`seat${index + 1}`];
                    if (!logId) {
                        continue;
                    }

                    // console.log(logId);
                    const log = await logsLogic.getLogByIdAsync(logId);
                    // console.log(log);
                    // console.log(new Date().getTime())
                    // console.log(new Date(log?.timestamp)?.getTime())
                    // console.log(new Date().getTime() - new Date(log?.timestamp).getTime());
                    // console.log(log?.approved);
        
                    if (new Date().getTime() - new Date(log?.timestamp)?.getTime() > 1 * 1000 && !log?.approved) {
                        try {            
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