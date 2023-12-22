const express = require('express');
const app = express();

const port = 3000;

//load JSON middelware
app.use(express.json())

const tasks = require('./tasks.js');
app.use('/tasks', tasks
    // #swagger.tags = ['Tasks']
);


// Server
app.listen(port, () => {
  console.log(`Bookstore app listening on port ${port}`);
});