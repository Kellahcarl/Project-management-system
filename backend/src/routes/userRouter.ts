import { Router } from "express";
import {
  getUser,
  getUsers,
  loginUser,
  registerUser,
} from "../controllers/userController";

const user_router = Router();

user_router.post("/register", registerUser);
user_router.get("/", getUsers);

user_router.post("/login", loginUser);
user_router.get("/:id", getUser);

export default user_router;
