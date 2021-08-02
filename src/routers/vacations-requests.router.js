const exoress = require('express');
const vacationsRequestsController = require('../controllers/vacations-requests.controller');
const { queryMiddleware } = require('@abujude/sgs-khadamati');

const Router = exoress.Router();

// /vacationsRequests?{lang=A} => GET
Router.get('/', vacationsRequestsController.getAllVacationsRequests);

Router.post('/'
    , queryMiddleware.parseDate(["startDate", "endDate"], "dateFormat", true, false, true)
    , vacationsRequestsController.createVacationRequest);

module.exports = Router;