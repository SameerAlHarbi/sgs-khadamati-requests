const Sequelize = require('sequelize');
const sequelize = require('../../util/database');
const employeeRequestAttachment = require('./employee-request-attachment');
const employeeRequestTrack = require('./employee-request-track');

class EmployeeRequest extends Sequelize.Model {

    get requestDateText() {
        return 'ok'
    }
}

const employeeRequest = EmployeeRequest.init({
    id: {
        type: Sequelize.INTEGER
        , autoIncrement: true
        , allowNull: false
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
        type: Sequelize.STRING
        , allowNull: false
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
            notNull: {
                msg: 'Invalid request status!'
            }
        }
    }
    , requesteBy: {
        type: Sequelize.INTEGER
        , allowNull: false
        , validate: {
            min: { args: [1], msg: 'Invalid request by employee id!' }
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
    , onDelete: 'CASCADE'
    , onUpdate: 'CASCADE' 
});

employeeRequestTrack.belongsTo(employeeRequest,{
    foreignKey: 'employeeRequestId'
    , onDelete: 'CASCADE'
    , onUpdate: 'CASCADE' 
});

employeeRequest.hasMany(employeeRequestAttachment, {
    foreignKey: 'employeeRequestId'
    , onDelete: 'CASCADE'
    , onUpdate: 'CASCADE' 
});

employeeRequestAttachment.belongsTo(employeeRequest,{
    foreignKey: 'employeeRequestId'
    , onDelete: 'CASCADE'
    , onUpdate: 'CASCADE' 
});


module.exports = employeeRequest;