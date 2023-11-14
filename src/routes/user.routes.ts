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
import { authUser, authRole } from "../middlewares/authMiddleware";
import { ROLES } from "../data/roles";

const router = express.Router();

// Définition des routes pour l'API user (Utilisateur)
router.post("/", createUserHandler);
router.post("/login", loginUserHandler);
router.get("/", authUser, authRole(ROLES.ADMIN), findAllUserHandler);
router.get("/me", authUser, getAuthUserHandler);
router.get("/prof", authUser, authRole(ROLES.ADMIN), findAllProfHandler);
router.get("/:id", findUserByIdHandler);
router.put("/:id", updateUserHandler);
router.delete("/:id", authRole(ROLES.ADMIN), deleteUserHandler);

export default router;
