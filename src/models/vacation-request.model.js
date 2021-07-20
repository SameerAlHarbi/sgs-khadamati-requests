module.exports = class VacationRequestModel {
    constructor(employeeId
              , requestDate
              , startDate
              , endDate
              , vacationTypeId
              , vacationTypeName
              , note) {
                  employeeId = employeeId;
                  requestDate = requestDate;
                  startDate = startDate;
                  endDate = endDate;
                  vacationTypeId = vacationTypeId;
                  vacationTypeName = vacationTypeName;
                  note = note;
              }
}