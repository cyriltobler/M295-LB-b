/* eslint-disable comma-dangle */
/* eslint-disable function-paren-newline */
const express = require('express');
const session = require('express-session');

const app = express();

// copied from the swagger ui express documentation
// eslint-disable-next-line import/no-extraneous-dependencies
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const port = 3000;

// load JSON middelware
app.use(express.json());

// load session-express middelware for cookies
app.use(session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));

// import routes from other files

const tasks = require('./tasks');
// eslint-disable-next-line comma-dangle
app.use('/tasks', tasks
    // #swagger.tags = ['Tasks']
);

const auth = require('./auth').router;
// eslint-disable-next-line comma-dangle
app.use('/', auth
    // #swagger.tags = ['Authentication']
);

// copied from the swagger ui express documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Server
app.listen(port, () => {
    console.log(`Taskmanager app listening on port ${port}`);
});
