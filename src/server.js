const https = require('https');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const logger = require("./helpers/loggerHelper");
const baseApp = require("./app");
require("dotenv").config();

console.log(`Welcome to ${process.env.SERVICE_NAME} service.`);
// const sslServer = https.createServer({
//   key: fs.readFileSync(path.join(__dirname,'cert','key.pem')),
//   cert: fs.readFileSync(path.join(__dirname,'cert','cert.pem')),
// }, baseApp);



const ConnectToDb = function(con){
  
//connect to mongoDB
  mongoose
  .connect(con,
            { 
              useNewUrlParser: true, 
              useUnifiedTopology: true, 
              useCreateIndex:true, 
              useFindAndModify:false 
            })
  .then(()=>{
      logger.info(`connected to ${con}`);
  })
  .catch((error)=>{
      logger.error("something went wrong connecting to the db",error);
  });
};

let DBCon = process.env.MONGODB_LOCAL; 
if(process.env.NODE_ENV.trim() === 'production')
  DBCon = process.env.MONGODB_URL;

ConnectToDb(DBCon);


const PORT = process.env.PORT_SSL || 3443;
//start server 
baseApp.listen(PORT, () => {
  logger.info(`Server started at PORT ${PORT}`);
});

//START SSL SERVER
// sslServer.listen(PORT, () => {
//   console.log(`SSL SERVER LISTENING ON PORT ${PORT}`);
// });
