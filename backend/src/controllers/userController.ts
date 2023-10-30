import { Request, Response } from "express";
import { execute, query } from "../database/dbconnect";
import Joi from "joi";
import bcrypt from "bcrypt";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { user } from "../types/userInterfaces";
import { generateToken } from "../services/tokenGenerator";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const procedureName = "getUsers";
    const result = await query(`EXEC ${procedureName}`);
    return res.json(result.recordset);
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    // console.log(id);

    const procedureName = "getUserById";
    const result = await execute(procedureName, { id });

    res.json(result.recordset);
  } catch (error) {
    console.log(error);
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);

    const newUser: user = {
      id: uuidv4(),
      username,
      email,
      password: newPassword,
      isdeleted: false,
      isAdmin: false,
    };

    const procedureName = "registerUser";
    const params = newUser;
    // console.log(params);

    await execute(procedureName, params);
    return res.send({ message: "User registered succesfully" });
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const procedureName = "getUserByEmail";
    const result = await execute(procedureName, { email });
    if (result) {
      const recordset = result.recordset;
      const user = recordset[0];

      if (!user) {
        return res.status(404).send({ message: "Account does not exist" });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(404).send({ message: "Invalid email or password" });
      }

      const token = generateToken(user.email, user._id);
      return res.send({
        user: _.pick(user, ["_id", "username", "email"]),
        token,
      });
    } else {
      return res.status(404).send({ message: "Account does not exist" });
    }
  } catch (error) {
    console.log(error);
  }
};
