const Sequelize = require("sequelize");
const sequelize = require('../database');

class VacationRequestTrack extends Sequelize.Model {


}

module.exports = VacationRequestTrack.init({
    id: {
        type: Sequelize.INTEGER
        , allowNull: false
        , primaryKey: true
        , autoIncrement: true
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
    , employeeRole: {
        type: Sequelize.STRING
        , allowNull: false
    }
    , employeePosition: {
        type: Sequelize.STRING
        , allowNull: true
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
        type: Sequelize.STRING
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
    , vacationRequestId: {
        type: Sequelize.INTEGER
        , allowNull: false
    }
}
, {
    sequelize,
    timestamps: false
});