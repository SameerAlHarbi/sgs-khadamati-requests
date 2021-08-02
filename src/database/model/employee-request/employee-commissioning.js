const Sequelize = require('sequelize');
const sequelize = require('../../db-client');

class EmployeeCommissioning extends Sequelize.Model {

}

module.exports = EmployeeCommissioning.init({
    id: {
        type: Sequelize.INTEGER
        , allowNull: false
        , primaryKey: true
        , autoIncrement: true
    }
    , commissionerId: {
        type: Sequelize.INTEGER
        , allowNull: false
        , validate: {
            min: 1
        }
    }
    , startDate: {
        type: Sequelize.DATE
        , allowNull: true
    }
    , endDate: {
        type: Sequelize.STRING
        , allowNull: true
        , validate: {
            isValidEndDate(value) {
                if(!this.startDate || value < this.startDate) {
                    throw new Error('End date must be after start date!');
                }
            }
        }
    }
    , employeeRequestId: {
        type: Sequelize.INTEGER
        , allowNull: false
    }
},
{
    sequelize
    , timestamps: false
    , validate: {
        isValidDates(){
            if((this.startDate === undefined) !== (this.endDate === undefined))
            {
                throw new Error('Start date and end date must have value or not have value');
            }
        }
    }
    , modelName: 'EmployeesCommissionings'
});
