const vacationsRequestsManager = require('../managers/vacations-requests.manager');
const VacationRequestModel = require('../models/vacation-request.model');
const { dateUtil } = require("@abujude/sgs-khadamati");

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

exports.createVacationRequest = async (req, res, next) => {
    const lang = req.query.lang;
    const newVacationRequest = req.body;

    const newVacationRequestModel = new VacationRequestModel(new Date()
        , newVacationRequest.employeeId
        , newVacationRequest.startDate
        , newVacationRequest.endDate
        , "Pending"
        , newVacationRequest.requestBy
        , newVacationRequest.requestByRole
        , newVacationRequest.note);

    const results = await vacationsRequestsManager
        .createNewVacationRequest(newVacationRequestModel);


    console.log(results);

    delete results.dataValues.id;


    return res.status(201).json(results);

}