const swaggerAutogen = require("swagger-autogen")();
require("dotenv").config();

const swaggerDefinition = {
  info: {
    title: `Express API for ${process.env.SERVICE_NAME}`,
    version: "1.0.0",
  },
  host: `${process.env.SERVICE_DOMAIN}:${process.env.PORT_SSL}`,
  basePath: "/api",

  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],

  schemes: ["https","http"],
  consumes: ["application/json"],
  produces: ["application/json"],
};

const outputFile = "./swagger/swagger.json";
const endpointsFiles = ["./routes/baseRoute.js"
                        //add more routes here...
                        ];
swaggerAutogen(outputFile, endpointsFiles, swaggerDefinition).then(() => {
  // eslint-disable-next-line global-require
  require("../app"); // Your project's root file
});
