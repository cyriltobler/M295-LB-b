/* eslint-disable comma-dangle */
// This code is from the Swagger documentary: https://swagger-autogen.github.io/docs/getting-started/quick-start

// eslint-disable-next-line import/no-extraneous-dependencies
const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Tasks',
        description: 'Description'
    },
    host: 'localhost:3000'
};

const outputFile = './swagger.json';
const routes = ['./src/server.js'];

swaggerAutogen(outputFile, routes, doc);
