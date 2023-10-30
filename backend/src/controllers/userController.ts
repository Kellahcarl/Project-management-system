import { Request, Response } from "express";
import { query } from "../database/dbconnect";
import Joi from "joi";
import bcrypt from "bcrypt";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { newUser, user } from "../types/userInterfaces";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);

    const newUser: newUser = {
      id: uuidv4(),
      username,
      email,
      newPassword,
    };
  } catch (error) {
    console.log(error);
  }
};
