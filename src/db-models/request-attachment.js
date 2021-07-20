const Sequelize = require("sequelize");
const sequelize = require("../util/database");

class RequestAttachment extends Sequelize.Model {

}

const requestAttachment = RequestAttachment.init({
    id: {
        type: Sequelize.INTEGER
        , autoIncrement: true
        , allowNull: false
        , primaryKey: true
    }
    , date: {
        type: Sequelize.DATE,
        allowNull: false
    }
},{
    sequelize
});

module.exports = requestAttachment;