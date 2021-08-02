const Sequelize = require("sequelize");
const sequelize = require('../../db-client');

class EmployeeRequestTrack extends Sequelize.Model {

}

module.exports = EmployeeRequestTrack.init({
    id: {
        type: Sequelize.INTEGER
        , allowNull: false
        , autoIncrement: true
        , primaryKey: true
    }
    , date:{
        type: Sequelize.DATE
        , allowNull: false
        , defaultValue: Sequelize.NOW
    }
    , employeeId: {
        type: Sequelize.INTEGER
        , allowNull: true
        , validate :{
            min: { args: [1], msg: 'Invalid employee id!' }
        }
    }
    , employeePosition: {
        type: Sequelize.STRING(100)
        , allowNull: true
    }
    , trackRoleNumber: {
        type: Sequelize.INTEGER
        , allowNull: false
        , validate: {
            min: 0
        }
    }
    , trackRoleName: {
        type: Sequelize.STRING(50)
        , allowNull: false
    }
    , accept: {
        type: Sequelize.BOOLEAN
        , allowNull: true
    }
    , responseDate: {
        type: Sequelize.DATE
        , allowNull: true
    }
    , responseNote: {
        type: Sequelize.TEXT
        , allowNull: true
    }
    , originalEmployeeId: {
        type: Sequelize.INTEGER
        , allowNull: true
        , validate :{
            min: { args: [1], msg: 'Invalid original employee id!' }
        }
    }    
    , originalEmployeePosition: {
        type: Sequelize.STRING(100)
        , allowNull: true
    }
    , responseBy: {
        type: Sequelize.INTEGER
        , allowNull: true
        , validate :{
            min: { args: [1], msg: 'Invalid response by employee id!' }
        }
    }
    , note: {
        type: Sequelize.TEXT
        , allowNull: true
    }
    , employeeRequestId: {
        type: Sequelize.INTEGER
        , allowNull: false
    }
}
, {
    sequelize
    , timestamps: false
    , modelName: 'EmployeesRequestsTracks',
});