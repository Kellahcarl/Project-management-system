// import { updatProject } from "./../types/projectInterface";
import { Request, Response } from "express";
import { execute, query } from "../services/dbconnect";

import { v4 as uuidv4 } from "uuid";
import {
  validateProject,
  validateProjectId,
  validateUpdateProject,
} from "../validators/projectValidator";
import { Project } from "../types/projectInterface";

export const createProject = async (req: Request, res: Response) => {
  try {
    const { project_name, project_description, dueDate } = req.body;

    const { error } = validateProject.validate(req.body);

    if (error)
      return res
        .status(400)
        .send({ success: false, message: error.details[0].message });

    const newProject: Project = {
      project_id: uuidv4(),
      project_name,
      dueDate,
      project_description,
    };

    const procedure2 = "createProject";
    const params = newProject;

    await execute(procedure2, params);
    return res.send({ message: "Project created successfully" });
  } catch (error) {
    console.log(error);
    res.send((error as Error).message);
  }
};
export const updateProject = async (req: Request, res: Response) => {
  try {
    const { project_id, project_name, project_description, dueDate } = req.body;

    const { error } = validateUpdateProject.validate(req.body);
    if (error)
      return res
        .status(400)
        .send({ success: false, message: error.details[0].message });

    const newProject: Project = {
      project_id,
      project_name,
      project_description,
      dueDate,
    };

    const ProcedureName = "updateProject";
    const params = newProject;

    await execute(ProcedureName, params);

    return res.send({ message: "User updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: (error as Error).message,
      message: "Internal Sever Error",
    });
  }
};
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).send({ message: "Id is required" });

    const { error } = validateProjectId.validate(req.params);

    if (error)
      return res
        .status(400)
        .send({ success: false, message: error.details[0].message });

    const procedureName = "deleteProject";
    await execute(procedureName, { id });

    res.status(201).send({ message: "Project deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: (error as Error).message,
      message: "Internal Sever Error",
    });
  }
};
export const completeProject = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) return res.status(400).send({ message: "Id is required" });

  const { error } = validateProjectId.validate(req.params);

  if (error)
    return res
      .status(400)
      .send({ success: false, message: error.details[0].message });

  const procedureName = "completeProject";
  await execute(procedureName, { id });

  res.status(201).send({ message: "Project completed Successfully" });
};
export const getProject = async (req: Request, res: Response) => {};
export const getProjects = async (req: Request, res: Response) => {};
export const getAssignedProject = async (req: Request, res: Response) => {};
export const assignProject = async (req: Request, res: Response) => {};
export const unassignProject = async (req: Request, res: Response) => {};
