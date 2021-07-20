const exoress = require('express');
const vacationsRequestsController = require('../controllers/vacations-requests.controller');

const Router = exoress.Router();

// /vacationsRequests?{lang=A} => GET
Router.get('/', vacationsRequestsController.getAllVacationsRequests);

module.exports = Router;