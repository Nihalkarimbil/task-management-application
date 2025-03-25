import express from "express"
import tryCatch from "../middleware/TryCatch"
import { addSection, deleteSection, getSection } from "../controllers/sections/SectionController"

const sectionRoute= express.Router()

sectionRoute
    .post("/add",tryCatch(addSection))
    .get("/get",tryCatch(getSection))
    .put("/delete/:id",tryCatch(deleteSection))

export default sectionRoute