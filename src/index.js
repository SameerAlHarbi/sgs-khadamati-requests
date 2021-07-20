//Packeges
const express = require("express");
const chalk = require("chalk");

//Middlewares
const {queryMiddleware} = require("@abujude/sgs-khadamati");
const authMiddleware = require('./middlewares/auth.middleware');

//Routers
const vacationsRequestsRouter = require('./routers/vacations-requests.router');

const errorsController = require('./controllers/errors.controller');

//Database
const sequelize = require('./util/database');
require('./db-models/employee-request/employee-request');

//Express server
const app = express();
app.use(express.json());
app.use(queryMiddleware.setLanguage('A', 'lang'));

app.use('/vacationsRequests', authMiddleware,vacationsRequestsRouter);

app.use('/500', errorsController.get500);
app.use(errorsController.get404);

//This middleware will be called directly whene ever we call next(Error)
app.use((error, req, res, next) => {
    error.httpStatusCode = error.httpStatusCode || 500;
    error.message = error.httpStatusCode !== 404 ? 
        error.message || '' : 'Data NotFound!';
    return res.status(error.httpStatusCode).json({ error : error.message });
});

const port = process.env.PORT || 8400;

sequelize
    .sync({ force: true, match: /-test$/ })
    .then(results => {

        app.listen(port, () => {

            switch(process.env.API_SERVER_TYPE)
            {
                case 'DEVELOPMENT':
                    console.log(chalk.yellowBright
                        .inverse(`SGS KHADAMATI Requests ${process.env.API_SERVER_TYPE} SERVER IS UP AND RUNNING ON PORT ${port}`));
                    break;
                case 'QUALITY':
                    console.log(chalk.cyan
                        .inverse(`SGS KHADAMATI Requests ${process.env.API_SERVER_TYPE} SERVER IS UP AND RUNNING ON PORT ${port}`));
                    break;
                default :
                     console.log(chalk.greenBright
                        .inverse(`SGS KHADAMATI Requests ${process.env.API_SERVER_TYPE} SERVER IS UP AND RUNNING ON PORT ${port}`));
            }
        
        });

    }).catch(error => { 
        console.log(chalk.red.inverse('Db Error!'));
        console.error(error);
    });
