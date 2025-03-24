import { NextFunction, Request, Response } from "express";
import Task from "../../models/Task";
import CustomError from "../../utils/CustomError";


export const createTask = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { title, description, dueDate, assignee, section } = req.body;
    const newTask = new Task({
        title,
        description,
        dueDate,
        assignee,
        section,
    });

    if (!newTask) {
        return next(new CustomError("error on creating task"));
    }

    await newTask.save();
    res.status(201).json({
        message: "task added succesfully",
        data: newTask,
        error: false,
    });
};

export const getTask = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const allTask = await Task.find({ isDeleted: false });
    if (!allTask) {
        return next(new CustomError("no Tasks found"));
    }
    res.status(200).json({
        message: "all Tasks",
        data: allTask,
        error: false,
    });
};

export const editTask = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTask) {
        return next(new CustomError("error on updating task"))
    }
    res.status(200).json({
        message: "Task edited Succesfully",
        data: updatedTask,
        error: false
    });
}

export const deleteTask = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const deleteTask = await Task.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true })
    if (!deleteTask) {
        return next(new CustomError("there was an error on deleting"))
    }
    res.status(200).json({
        message: "task deleted succesfull",
        data: deleteTask,
        error: false
    })
}

export const moveTask = async (req: Request, res: Response ,next :NextFunction) => {
    const { taskId, newSection } = req.body;
    const task = await Task.findByIdAndUpdate(taskId, { section: newSection }, { new: true });
    if (!task){
        return next(new CustomError("no task Found",404))
    } 
    res.status(200).json({
        data:task,
        message:"task moved succesfully",
        error:false
    });

};
