import express from "express";
import {
  createUserHandler,
  findUserByIdHandler,
  findAllUserHandler,
  updateUserHandler,
  deleteUserHandler,
  loginUserHandler,
  findAllProfHandler,
  getAuthUserHandler,
} from "../controllers/user.controller";

import { authUser } from "../middlewares/authMiddleware";

const router = express.Router();

// Définition des routes pour l'API user
router.post("/", createUserHandler);
router.post("/login", loginUserHandler);
router.get("/", findAllUserHandler);
router.get("/me", authUser, getAuthUserHandler);
router.get("/prof", findAllProfHandler);
router.get("/:id", findUserByIdHandler);
router.put("/:id", updateUserHandler);
router.delete("/:id", deleteUserHandler);

export default router;
