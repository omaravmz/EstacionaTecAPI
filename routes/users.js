import { Router } from "express";
import usersController from "../controllers/usersController.js";

const router = Router();

router.get("/", usersController.getAll);

router.get("/:id", usersController.getUserById);

router.put("/:id", usersController.updateUser);

router.delete("/:id", usersController.deleteUser);

export default router;
