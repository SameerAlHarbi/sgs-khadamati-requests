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

validateVacationRequest = async (vacationRequest) => {

    let validationMessage = '';

    if(!vacationRequest) {
        validationMessage = 'Invalid vacation!';
    } else if(!vacationRequest.startDate) {
        validationMessage = 'Invalid vacation start date!';
    } else if(!vacationRequest.endDate) {
        validationMessage = 'Invalid vacation end date!';
    } else if (isNaN(vacationRequest.employeeId)) {
        validationMessage = 'Invalid employee id!';
    } else if(!vacationRequest.vacationTypeId || vacationRequest.vacationTypeId.trim() === "") {
        validationMessage = 'Invalid vacation type id!';
    } else if (isNaN(vacationRequest.requestBy)) {
        validationMessage = 'Invalid request by employee id!';
    } else if (isNaN(vacationRequest.requestByRole)) {
        validationMessage = 'Invalid employee id!';
    }

    if (validationMessage === '') {
        if(vacationRequest.endDate < vacationRequest.startDate) {
            validationMessage = 'Invalid vacation end date!';
        } 
    }

    let badRequest = true;

    if(validationMessage === '' ) {
        badRequest = false;
        const result = await 
        vacationsRequestsManager.validateVacationRequest(vacationRequest);
        
        validationMessage = result.validationMessage;
    }

    return { message: validationMessage, badRequest, result : validationMessage === ''};
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