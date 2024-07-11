import { RequestHandler } from "express";
import Projects from "../models/Projects";

export const AddProject: RequestHandler = async function (req, res: any, next) {
  try {
    const { title, reason, type, division, category, priority, dept, location, status, startDate, endDate } = req.body;
    const { id } = res.user;
    const newProject = await Projects.create({
      title, reason,
      type, division,
      category, priority,
      dept, location,
      status, startDate,
      endDate, user: id,
    });
    res.status(201).json({ message: `${title} added to project list` });
  } catch (error) {
    console.log(error);
    next(error);
  }
}