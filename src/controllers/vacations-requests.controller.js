const vacationsRequestsManager = require('../managers/vacations-requests.manager');

exports.getAllVacationsRequests = async (req, res, next) => {

    const lang = req.query.lang;

    try{

        const results = await vacationsRequestsManager.getAllVacationsRequests();
        return res.json(results);

    } catch(error) {
        error.httpStatusCode = error.httpStatusCode || 500;
        return next(error);
    }
}