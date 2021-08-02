const Sequelize = require('sequelize');
const sequelize  =require('../../db-client');

class VacationRequest extends Sequelize.Model {

}

module.exports = VacationRequest.init({
    id: {
        type: Sequelize.INTEGER
        , allowNull: false
        , autoIncrement: true
        , primaryKey: true
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
    , vacationTypeId: {
        type: Sequelize.STRING(50)
        , allowNull: false
        , validate: {
            notEmpty: true
            , isInt: true
        }
    }
    , employeeRequestId: {
        type: Sequelize.INTEGER
        , allowNull: false
    }
}, {
    sequelize
    , timestamps: false
    , modelName: 'vacationsRequests'
})