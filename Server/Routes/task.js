const express = require('express');
const app = express();
const Task = require('../Models/task');

app.post('/task', (req, res)=>{
    let body = req.body;

    let task = new Task({
        task: body.task,
        endDate: body.endDate,
        endTime: body.endTime
    });

    task.save((err,data)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            msg:"Task saved successfuly",
            data
        });
    });
});

app.get('/task',(req,res)=>{
    Task.find()
    .exec((err,data)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        return res.status(200).json({
            ok: true,
            data
        });
    });
});

app.put('/task/:id', (req,res)=>{
    let id = req.params.id;
    let body = req.body
    Task.findByIdAndUpdate(id,{complete:body.complete},{new: true, runValidators:true, context:'query'},(err,data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            msg:"Task completed successfuly",
            data
        });
    });
});

app.delete('/task/:id', (req,res)=>{
    let id = req.params.id;
    
    Task.deleteOne({_id:id},(err, data)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (data.deletedCount === 0) {
            return res.status(400).json({
                ok:false,
                msg: 'Task not found'
            });
        }
        return res.status(200).json({
            ok:true,
            msg:'Task deleted successfuly',
            data
        });
    });
});

module.exports = app;