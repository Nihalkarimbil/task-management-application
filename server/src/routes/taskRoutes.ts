import express from "express";
import tryCatch from "../middleware/TryCatch";
import { createTask, editTask, getTask } from "../controllers/tasks/TaskController";

const taskRouter = express.Router();
taskRouter
    .post("/addTask", tryCatch(createTask))
    .get("/getTask", tryCatch(getTask))
    .put("/editTask/:id",tryCatch(editTask))

export default taskRouter;


