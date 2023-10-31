import { Router } from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/userController";

const user_router = Router();

user_router.post("/register", registerUser);
user_router.get("/", getUsers);
user_router.put("/", updateUser);

user_router.post("/login", loginUser);
user_router.get("/:id", getUser);
user_router.delete("/:id", deleteUser);

export default user_router;
