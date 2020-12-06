const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

router.get('/:id', async (req, res) => {
    const tasks = await Task.findById(req.params.id);
    res.json(tasks);
});

router.post('/', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.json({
        status: 'Tarea Creada.'
    })
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    await Task.findByIdAndUpdate(id, req.body);
    res.json({
        status: 'Tarea Actualizada.'
    })
})

router.delete('/:id', async (req, res) => {
    await Task.findByIdAndRemove(req.params.id);
    res.json({
        status: 'Tarea Eliminada.'
    })
})

module.exports = router;