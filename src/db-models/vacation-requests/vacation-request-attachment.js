const Sequelize = require("sequelize");
const sequelize = require('../../util/database');

const RequestAttachment = require("../request-attachment");

class VacationRequestAttachment extends RequestAttachment {

}

module.exports = VacationRequestAttachment.init({
    describtion: {
        type: Sequelize.TEXT
        , allowNull: true
    }
},{
    sequelize
});