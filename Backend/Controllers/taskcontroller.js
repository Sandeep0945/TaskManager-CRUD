const Task = require("../Models/task.model.js");

// Create Task

const createTask = async (req,res)=>{
    try{
        const { title , description } = req.body;

        const task = await Task.create({
            title,
            description
        })

        res.status(201).json({
            message:"Task Created Successfully",
            task
        })
    }
    catch(err){
        res.status(500).json({
            message:"Server Error"
        })
    }
}

// Read Task

const readTask = async(req,res)=>{
    try{
        const tasks = await Task.find();
        res.status(200).json({
            tasks
        })
    }
    catch(error){
        res.status(500).json({
            message:"Server Error"
        })
    }
}

// Update Task

const updateTask = async (req,res) => {
    try {
        const update = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: "after" }
        );
        res.status(200).json({
            message:"Task Updated Successfully",
        })
    } 
    catch (error) {
        res.status(500).json({
            message:"Server Error"
        })
    }
}

// Delete Task

const deleteTask = async (req,res)=>{
    try{
        const deletetask = await Task.findByIdAndDelete({
            _id: req.params.id
        })
        res.status(200).json({
            message:"Task Deleted Successfully",
        })
    }
    catch(error){
        res.status(500).json({
            message:"Server Error"
        })
    }
}

module.exports = {
    createTask,
    readTask,
    updateTask,
    deleteTask   
}