const Sequelize = require('sequelize');
const sequelize = require('../../util/database');
const { dateUtil } = require('@abujude/sgs-khadamati');
const vacationRequestTrack = require('./vacation-request-track');
const vacationRequestAttachment = require('./vacation-request-attachment');

 class VacationRequest extends Sequelize.Model {

    get requestDateText() {
        return 'ok'
    }

}

const vacationRequest = VacationRequest.init({

    id: {
            type: Sequelize.INTEGER
            , autoIncrement: true
            , allowNull: false
            , primaryKey: true
        }
        , requestDate: {
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
        , vacationTypeId: {
            type: Sequelize.STRING(50)
            , allowNull: false
            , validate: {
                notEmpty: true
                , isInt: true
            }
        }
        , startDate: {
            type: Sequelize.DATEONLY
            , allowNull: false
        }
        , endDate: {
            type: Sequelize.DATEONLY
            , allowNull: false
            , validate: {
                isValidEndDate(value) {
                    if(value < this.startDate) {
                        throw new Error('End date must be after start date!');
                    }
                }
            }
        }
        , requestedBy: {
            type: Sequelize.INTEGER
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
        , note: {
            type: Sequelize.TEXT
            , allowNull: true
        }
},{ 
    sequelize
    , timestamps: true
    //, modelName: 'VacationsRequests',
    , validate: {
        isValidEndDate() {
            if(this.endDate < this.startDate) {
                throw new Error('End date must be after start date!');
            }
        }
    }
});

vacationRequest.hasMany(vacationRequestTrack, {
    foreignKey: 'vacationRequestId'
    , onDelete: 'CASCADE'
    , onUpdate: 'CASCADE' 
});

vacationRequestTrack.belongsTo(vacationRequest,{
    foreignKey: 'vacationRequestId'
    , onDelete: 'CASCADE'
    , onUpdate: 'CASCADE' 
});

vacationRequest.hasMany(vacationRequestAttachment);

module.exports = vacationRequest;