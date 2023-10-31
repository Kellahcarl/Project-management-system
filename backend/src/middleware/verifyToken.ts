import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";

dotenv.config();

import jwt from "jsonwebtoken";
import { updatUser, user } from "../types/userInterfaces";

export interface ExtendedUser extends Request {
  info?: updatUser;
}

export const verifyToken = (
  req: ExtendedUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers?.["token"] as string;
    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }
    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY as string
    ) as updatUser;
    req.info = decoded;
  } catch (error) {
    return res.json((error as Error).message);
  }

  next();
};
