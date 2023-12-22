/* eslint-disable consistent-return */
/* eslint-disable comma-dangle */
const express = require('express');
const { randomUUID } = require('node:crypto');
// eslint-disable-next-line spaced-comment
const { isAuth } = require('./auth'/* #swagger.ignore = true*/);

const router = express.Router();

let tasks = [
    {
        id: '1',
        title: 'Bahnhof',
        author: 'Cyril',
        created_at: '2023-12-22T08:39:34.691Z'
    },
    {
        id: '2',
        title: 'Bahnhof',
        author: 'Cyril',
        created_at: '2023-12-22T08:39:34.691Z'
    }
];

router.get('/', isAuth, (req, res) => {
    // #swagger.summary = 'Get all tasks'
    res.json(tasks);
});

router.post('/', isAuth, (req, res) => {
    // #swagger.summary = 'Create a new task'
    const { title, author } = req.body;
    if (!title || !author) {
        return res.status(422).json({ error: 'Title and author are required' });
    }

    // create a new task
    const newTask = {
        id: randomUUID(),
        title,
        author,
        created_at: new Date(),
        done_at: undefined
    };
    tasks.push(newTask);

    res.status(201).json(newTask);
});

router.get('/:id', isAuth, (req, res) => {
    // #swagger.summary = 'Get a task by ID'
    const selectedTask = tasks.find((task) => task.id === req.params.id);

    if (!selectedTask) {
        return res.status(404).json({ error: 'ID not found' });
    }

    res.json(selectedTask);
});

router.patch('/:id', isAuth, (req, res) => {
    // #swagger.summary = 'Edit a task by ID'
    const { title, author } = req.body;
    const oldTask = tasks.find((task) => task.id === req.params.id);

    if (!oldTask) {
        return res.status(404).json({ error: 'ID not found' });
    }

    oldTask.author = author || oldTask.author;
    oldTask.title = title || oldTask.title;
    tasks = tasks.map((task) => (task.id === req.params.id ? oldTask : task));

    res.json(oldTask);
});

router.delete('/:id', isAuth, (req, res) => {
    // #swagger.summary = 'Delete a task by ID'
    const selectedTask = tasks.find((task) => task.id === req.params.id);

    if (!selectedTask) {
        return res.status(404).json({ error: 'ID not found' });
    }

    // delete book fromthe array
    tasks = tasks.filter((task) => task.id !== req.params.id);

    res.json(selectedTask);
});

module.exports = router;
