import Section from "../../models/Section";
import { Request, Response, NextFunction } from "express";
import CustomError from "../../utils/CustomError";


export const addSection = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { name } = req.body;
    if (!name) {
        return next(new CustomError("title not found", 404));
    }
    const newSection =new Section({
        name
    })

    const section= await newSection.save()
    res.status(201).json({
        data: section,
        message: "section created succesfully",
        error: false,
    });
};

export const getSection = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const sections = await Section.find({isDeleted:false});
    if (!sections) {
        return next(new CustomError("sections not found",404));
    }
    res.status(200).json({
        data: sections,
        message: "all sections",
        error: false,
    });
};

export const deleteSection =async(
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    const removedSection= await Section.findByIdAndUpdate(req.params.id,{isDeleted:true},{new:true})
    if(!removedSection){
        return next(new CustomError("there was an error on deleting"))
    }
    res.status(200).json({
        message:"section removed succesfully",
        data:removedSection,
        error:false
    })
}

