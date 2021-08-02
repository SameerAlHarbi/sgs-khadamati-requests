const Sequelize = require('sequelize');
const sequelize = require('../../db-client');
const employeeRequestTrack = require('./employee-request-track');
const employeeRequestAttachment = require('./employee-request-attachment');
const employeeCommissioning = require('./employee-commissioning');
const vacationRequest = require('./vacation-request');
const { dateUtil } = require('@abujude/sgs-khadamati');

class EmployeeRequest extends Sequelize.Model {

    get dateText() {
        return dateUtil.formatDate(this.date);
    }
}

const employeeRequest = EmployeeRequest.init({
    id: {
        type: Sequelize.INTEGER
        , allowNull: false
        , autoIncrement: true
        , primaryKey: true
    }
    , date: {
        type: Sequelize.DATE
        , allowNull: false
        , defaultValue: Sequelize.NOW
        // , get: function() {
        //     return this.getDataValue('requestDate');
        // }
        // , set: function(val) {
        //     this.setDataValue('requestDate', val);
        // }
    }
    , employeeId: {
        type: Sequelize.INTEGER
        , allowNull: false
        , validate: {
            min: { args: [1], msg: 'Invalid employee id!' }
        }
    }
    , requestType:{
        type: Sequelize.ENUM
        , values: [
            'Vacation'
            , 'Delegation'
            , 'Commissioning'
            , 'Excuse'
            , 'Overtime'
        ]
        , defaultValue: 'Vacation'
        , allowNull: false
        , validate: {
            notEmpty: {
                msg: 'Invalid request type'
            }
        }
    }
    , status: {
        type: Sequelize.ENUM
        , values: [
            'Pending'
            , 'New'
            , 'Processing'
            , 'FinalProcessing'
            , 'Accepted'
            , 'Rejected'
            , 'Expired'
            , 'Canceled']
        , allowNull: false
        , defaultValue: 'Pending'
        , validate : {
            notEmpty: {
                msg: 'Invalid request status!'
            }
        }
    }
    , requestBy: {
        type: Sequelize.INTEGER
        , allowNull: false
        , validate: {
            min: { args: [1], msg: 'Invalid request by employee id!' }
        }
    }
    , requestByRole: {
        type: Sequelize.ENUM
        , values: [
            'Employee'
            , 'HR'
            , 'Manager'
            , 'Admin'
        ]
        , defaultValue: 'Employee'
        , allowNull: false
        , validate: {
            notEmpty: true
        }
    }
    , note: {
        type: Sequelize.TEXT
        , allowNull: true
    }
},{
    sequelize
    , timestamps: true
    , createdAt: false
    , updatedAt: true
    , modelName: 'EmployeesRequests',
});

employeeRequest.hasMany(employeeRequestTrack, {
    foreignKey: 'employeeRequestId'
    , onUpdate: 'CASCADE' 
    , onDelete: 'CASCADE'
});

employeeRequestTrack.belongsTo(employeeRequest,{
    foreignKey: 'employeeRequestId'
    , onUpdate: 'CASCADE' 
    , onDelete: 'CASCADE'
});

employeeRequest.hasMany(employeeRequestAttachment, {
    foreignKey: 'employeeRequestId'
    , onUpdate: 'CASCADE' 
    , onDelete: 'CASCADE'
});

employeeRequestAttachment.belongsTo(employeeRequest,{
    foreignKey: 'employeeRequestId'
    , onUpdate: 'CASCADE'
    , onDelete: 'CASCADE' 
});

employeeRequest.hasOne(vacationRequest, {
    foreignKey: 'employeeRequestId'
    , onUpdate: 'CASCADE'
    , onDelete: 'CASCADE'
});

vacationRequest.belongsTo(employeeRequest, {
    foreignKey: 'employeeRequestId'
    , onUpdate: 'CASCADE'
    , onDelete: 'CASCADE'
});

employeeRequest.hasMany(employeeCommissioning, {
    foreignKey: 'employeeRequestId'
    , onUpdate: 'CASCADE'
    , onDelete: 'CASCADE'
});

employeeCommissioning.belongsTo(employeeRequest, {
    foreignKey: 'employeeRequestId'
    , onUpdate: 'CASCADE'
    , onDelete: 'CASCADE'
});

module.exports = employeeRequest;