const EmployeeRequest = require('../database/model/employee-request/employee-request');

exports.getAllVacationsRequests = async () => {

    try {

       const results = await EmployeeRequest.findAll();
        return results;

    } catch(error) {
        throw error;
    }

}

exports.createNewVacationRequest = async (newVacationRequest) => {
    try {


        const results = await EmployeeRequest.create(newVacationRequest);

        return results;

    } catch(error) {
        throw error;
    }
}