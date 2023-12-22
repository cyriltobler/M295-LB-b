const express = require('express');
const router = express.Router();
const { randomUUID } = require('node:crypto');
const { runInNewContext } = require('node:vm');

const tasks = [
    {
        id: "1",
        title: "Bahnhof",
        author: "Cyril",
        created_at: "2023-12-22T08:39:34.691Z"
    }
];


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

router.get('/:id', (req, res) => {
    const task = tasks.find((task) => task.id === req.params.id)

    if(!task){
        res.status(404).json({error: "ID not found"});
    }

    res.json(task)
});

module.exports = router;