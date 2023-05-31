const express = require('express')
const Task = require('../models/TaskSchema')

const crearTask = async (req, res = express.request) => {
    const task = new Task(req.body)

    try {
        task.user = req.uid
        const saved = await task.save()
        res.json({
            ok: true,
            task: saved
        })
    } catch(error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            task: 'Internal Error'
        })
    }
}

const listarTasks = async (req, res = express.request) => {
    const tasks = await Task.find()
                            .populate('user', 'name')
    try {
        res.status(200).json({
            ok: true,
            tasks
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Internal Error'
        })
    }
}

const actualizarTask = async (req, res = express.request) => {
    const { taskId } = req.params.id;

    try {
        const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
        
        if (!updatedTask) {
            return res.status(404).json({
                ok: false,
                msg: 'Task not found'
            });
        }
        
        res.json({
            ok: true,
            task: updatedTask
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Internal Error'
        });
    }
};

const eliminarTask = async (req, res = express.request) => {
    const { taskId } = req.params.id;

    try {
        const deletedTask = await Task.findByIdAndDelete(taskId);
        
        if (!deletedTask) {
            return res.status(404).json({
                ok: false,
                msg: 'Task not found'
            });
        }
        
        res.json({
            ok: true,
            task: deletedTask
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Internal Error'
        });
    }

}

module.exports = {crearTask,listarTasks,eliminarTask,actualizarTask}