//IMPORTS
const express = require('express');
const swaggerUi  = require('swagger-ui-express');
const cors = require('cors');
require('dotenv').config();
const swaggerFile = require('./swagger/swagger.json');
const baseRouter = require('./routes/baseRoute');
// const logger = require("./helpers/loggerHelper");

const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use('/api/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));

//routes
app.use('/api',baseRouter);

module.exports = app;
