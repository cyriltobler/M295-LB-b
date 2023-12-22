const express = require('express');
const session = require('express-session');
const app = express();

const port = 3000;

// load JSON middelware
app.use(express.json())

// load session-express middelware for cookies
app.use(session({
    secret: 'supersecret',
        resave: false,
        saveUninitialized: true,
    cookie: {}
}))


// import other files

const tasks = require('./tasks.js');
app.use('/tasks', tasks
    // #swagger.tags = ['Tasks']
);

const auth = require('./auth.js').router;
app.use('/', auth
    // #swagger.tags = ['Authentication']
);


// Server
app.listen(port, () => {
    console.log(`Bookstore app listening on port ${port}`);
});
