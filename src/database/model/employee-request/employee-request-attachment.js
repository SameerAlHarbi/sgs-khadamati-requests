const Sequelize = require('sequelize');
const sequelize = require('../../db-client');

class EmployeeRequestAttachment extends Sequelize.Model {

}

module.exports = EmployeeRequestAttachment.init({
    id: {
        type: Sequelize.INTEGER
        , allowNull: false
        , primaryKey: true
        , autoIncrement: true
    }
    , date: {
        type: Sequelize.DATE
        , allowNull: false
        , defaultValue: Sequelize.NOW
    }
    , fileName: {
        type: Sequelize.STRING
        , allowNull: false
    }
    , employeeRequestId: {
        type: Sequelize.INTEGER
        , allowNull: false
    }
},{
    sequelize
    , timestamps: true
    , createdAt: false
    , updatedAt: true
    , modelName: 'EmployeesRequestsAttachments'
})