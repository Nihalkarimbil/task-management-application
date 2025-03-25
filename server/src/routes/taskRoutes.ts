import express from "express";
import tryCatch from "../middleware/TryCatch";
import { createTask, deleteTask, editTask, getTask, moveTask } from "../controllers/tasks/TaskController";

const taskRouter = express.Router();
taskRouter
    .post("/add", tryCatch(createTask))
    .get("/get", tryCatch(getTask))
    .put("/edit/:id",tryCatch(editTask))
    .put("/delete/:id",tryCatch(deleteTask))
    .put("/move",tryCatch(moveTask))

export default taskRouter;


