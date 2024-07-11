import { RequestHandler } from "express";
import Projects from "../models/Projects";

export const GetProject: RequestHandler = async function (req, res: any, next) {
  try {
    const { id } = res.user;
    const projectList = await Projects.find({ user: id }).select(['-user', '-createdAt', '-updatedAt']);
    res.status(200).json(projectList);
  } catch (error) {
    next(error);
  }
}