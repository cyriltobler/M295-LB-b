const express = require('express');
const router = express.Router();
const { randomUUID } = require('node:crypto');

const tasks = [];


router.get('/', (req, res) => {
    res.json(tasks);
});

router.post('/', (req, res) => {
    const {title, author} = req.body;
    if(!title || !author){
        return res.status(422).json({error: "Title and author are required"});
    };

    //create a new task
    const newTask = {
        id:  randomUUID(),
        title: title,
        author: author,
        created_at: new Date(),
        done_at: undefined
    };
    tasks.push(newTask);

    res.status(201).json(newTask);
});


module.exports = router;