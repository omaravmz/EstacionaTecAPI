import { Router } from "express";
import userController from "../controllers/userController.js";

const route = Router();

route.get("/", userController.getAll);
route.get("/:id", userController.getUserById);
route.put("/:id", userController.updateUser);
route.delete("/:id", userController.deleteUser);
route.put("/:email/role", userController.updateUserRoleByEmail);

export default route;
