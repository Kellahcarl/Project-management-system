import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";

dotenv.config();

import jwt from "jsonwebtoken";
import { user } from "../types/userInterfaces";

export interface ExtendedUser extends Request {
  info?: user;
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
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
    req.info = decoded as user;
  } catch (error) {}
  next();
};
