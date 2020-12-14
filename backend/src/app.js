const express = require('express');
const mongoose = require('mongoose');
const log = require('npmlog')
const morgan = require('morgan');
const cors = require('cors');
const handler404 = require('./middlewares/handler-404');
const errorHandler = require('./middlewares/error-handler');
const { mongoUrl } = require('./config/index');
const healthcheck = require('./controllers/healthcheck.controller');
const formsController = require('./controllers/forms.controller');

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}))

//Mongo Connection
mongoose
    .connect(mongoUrl ,{
        useNewUrlParser:true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    }).then(()=>{
        log.info('FYI','Database Connected with user \'forms-server\'');
    }).catch(err=>{
        log.error('FATAL','Failed to connect to database with error: %j', err);
        process.exit();
    });

//Routes
app.use(healthcheck);
app.use('/', formsController);

app.use(handler404);
app.use(errorHandler);

module.exports = app;
