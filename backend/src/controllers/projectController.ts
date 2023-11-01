import { Request, Response } from "express";
import { query } from "../services/dbconnect";

import { v4 as uuidv4 } from "uuid";

export const createProject = async (req: Request, res: Response) => {};
export const updateProject = async (req: Request, res: Response) => {};
export const deleteProject = async (req: Request, res: Response) => {};
export const completeProject = async (req: Request, res: Response) => {};
export const getAssignedProject = async (req: Request, res: Response) => {};
export const assignProject = async (req: Request, res: Response) => {};
export const unassignProject = async (req: Request, res: Response) => {};
