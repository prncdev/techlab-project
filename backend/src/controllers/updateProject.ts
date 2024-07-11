import { RequestHandler } from "express";
import Projects from "../models/Projects";

export const UpdateProject: RequestHandler = async function (req, res: any, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedProject = await Projects.findByIdAndUpdate(id,{status, updatedAt: Date.now()});
    updatedProject?.save();

    const result = await Projects.find({user: res.user?.id}).select(['-user', '-createdAt', '-updatedAt']);
    console.log(result);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
}