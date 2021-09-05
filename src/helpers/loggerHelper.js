const winston = require('winston');
const path = require('path');
require("dotenv").config();

module.exports = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: `${process.env.SERVICE_NAME}-express-service` },
    transports: [
        new winston.transports.File({ filename: path.join('./', 'errors','error.log'), level: 'error' }),
        new winston.transports.Console({
            format:winston.format.combine(
                winston.format.colorize({all:true})
                )
            })
        ],
        exceptionHandlers:[
            new winston.transports.File({ filename: path.join('./', 'errors','exceptions.log') }),
        ],
    });