"use-stric"

const express = require('express');
const router = express.Router();
const Task = require('../models/task')

router.get('/', async (Request, Response) =>{
    const tasks = await Task.find();
    Response.render('index',{
        tasks
    });
});

router.post('/add', async (Request, Response) =>{
    const task = new Task(Request.body);
    await task.save();
    Response.redirect('/');
});

router.get('/delete/:id', async (Request, Response) =>{
    const { id } = Request.params
    await Task.deleteOne({_id: id});
    Response.redirect('/');
});

router.get('/turn/:id', async (Request, Response) =>{
    const { id } = Request.params;
    const task = await Task.findById(id);
    task.status = !task.status;
    await task.save()
    Response.redirect('/');
});

router.get('/edit/:id', async (Request, Response) =>{
    const { id } = Request.params;
    const task = await Task.findById(id);
    Response.render('edit', {task});
});

router.post('/edit/:id', async (Request, Response) =>{
    const { id } = Request.params;
    const task = await Task.update({_id: id},Request.body);
    Response.redirect('/');
});



module.exports = router;