import greenlet from 'greenlet'
const cinemasController = require("../controllers-layer/cinemas-controller");
const logsLogic = require("../logics-layer/logs-logic");

let scanForOldUnaprovedSeatsAndDeleteThem = greenlet( async () => {
    const cinemas = cinemasController.get();

    cinemas.forEach(async (cinema, index) => {
        try {
            const logId = cinema[`seat${index + 1}`];
            const log = await logsLogic.getLogByIdAsync(logId);
            if (new Date().now - log.timestamp > 15 && !log.approved) {
                try {            
                    const updatedCinema = await cinemasLogic.updateCinemaSeatAsNullAsync(cinema.id, `seat${index + 1}`);
                    if (!updatedCinema) {
                        console.err(`unexpected error occured`);
                        return;
                    }
                }
                catch (err) {
                    console.err(err.message);
                }
            }
        }
        catch (err) {
            console.err(err.message);
        }
    });

})

console.log(await scanForOldUnaprovedSeatsAndDeleteThem())