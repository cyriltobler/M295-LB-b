const express = require('express');
const router = express.Router();
const { randomUUID } = require('node:crypto');
const { runInNewContext } = require('node:vm');

let tasks = [
    {
        id: "1",
        title: "Bahnhof",
        author: "Cyril",
        created_at: "2023-12-22T08:39:34.691Z"
    },
    {
        id: "2",
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
    const task = tasks.find((task) => task.id === req.params.id);

    if(!task){
        return res.status(404).json({error: "ID not found"});
    };

    res.json(task)
});

router.patch('/:id', (req, res) => {
    const {title, author} = req.body;
    const oldTask = tasks.find((task) => task.id === req.params.id);

    if(!oldTask){
        return res.status(404).json({error: "ID not found"});
    };

    oldTask['author'] = author || oldTask['author'];
    oldTask['title'] = title || oldTask['title'];
    tasks = tasks.map((task) => task.id === req.params.id ? oldTask : task);
    
    res.json(oldTask);
});

router.delete('/:id', (req, res) => {
    const task = tasks.find((task) => task.id === req.params.id);

    if(!task){
        return res.status(404).json({error: "ID not found"});
    };

    //delete book
    tasks = tasks.filter((task) => task.id !== req.params.id);

    res.json(task);
});

module.exports = router;