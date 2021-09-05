const express = require("express");
const axios = require('axios');
const https = require('https');
const pjson = require("../package.json");
const AppError = require("../helpers/errorHelper");

const baseRouter = express.Router();

// Get
baseRouter.get("/", async (req, res) => {
    // #swagger.ignore = true 
    const swaggerUrl = `${req.protocol}://${req.headers.host}/api/swagger`;
    res.status(200).json({
      name: "node-templete-api",
      version: `v${pjson.version}`,
      swaggerDoc: `To View Swagger Documentation click ${swaggerUrl}`,
    });
  });
  baseRouter.post('/login', async (req, res) => {
    // #swagger.tags = ['Auth']
    // #swagger.description = 'Endpoint Used to get Access and Refresh Token'
    /*    #swagger.parameters['obj'] = {
              in: 'body',
              description: 'Logging In a User.',
              schema: {
                  $email: "any",
                  $password: "any"
              }
      } */
    const {email} = req.body;
    const {password} = req.body;
  
  const instance = axios.create({
    httpsAgent: new https.Agent({  
      headers: {
        "Content-Type": "application/json",
        "Content-Length": req.body.length,
      },
      rejectUnauthorized: false
    })
  });
  instance.post( 'https://common-auth.herokuapp.com/api/auth/login',{
    email: email,
    password: password
  }).
  then(result => {
    res.status(200).send(result.data);
  }).catch(err=>{
    if(err)
      res.status(500).send(err.message);
  });
});

  baseRouter.all("*", async (req, res, next) => {
    const error = new AppError({
      message: "No Found",
      statusCode: 404,
    });
    next(error);
  });
  
  baseRouter.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.status(err.statusCode).json({
      error: {
        status: err.status || 500,
        message: err.message,
      },
    });
  });

  
  module.exports = baseRouter;
  