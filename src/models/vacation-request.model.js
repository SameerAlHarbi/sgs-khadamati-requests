const { request } = require("express");

module.exports = class VacationRequestModel {
    constructor(  date
                , employeeId
                , startDate
                , endDate
                , status
                , requestBy
                , requestByRole
                , note) {
                  this.date = date; 
                  this.employeeId = employeeId;
                  this.startDate = startDate;
                  this.endDate = endDate;
                  this.status = status;
                  this.requestType = "Vacation";
                  this.requestBy = requestBy;
                  this.requestByRole = requestByRole;
                  this.note = note;
              }
}