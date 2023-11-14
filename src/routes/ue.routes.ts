import express from "express";
import {
  createUeHandler,
  findUeByIdHandler,
  findAllUeHandler,
  updateUeHandler,
  deleteUeHandler,
} from "../controllers/ue.controller";
import { authRole, authUser } from "../middlewares/authMiddleware";
import { ROLES } from "../data/roles";

const router = express.Router();

// Définition des routes pour l'API ue
router.post("/", authUser, authRole(ROLES.ADMIN), createUeHandler);
router.get("/", authUser, authRole(ROLES.ADMIN), findAllUeHandler);
router.get("/:id", authUser, authRole(ROLES.ADMIN), findUeByIdHandler);
router.put("/:id", authUser, authRole(ROLES.ADMIN), updateUeHandler);
router.delete("/:id", authUser, authRole(ROLES.ADMIN), deleteUeHandler);

export default router;
