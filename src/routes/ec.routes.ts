import express from "express";
import {
  createEcHandler,
  findEcByIdHandler,
  findAllEcHandler,
  updateEcHandler,
  deleteEcHandler,
} from "../controllers/ec.controller";
import { authRole, authUser } from "../middlewares/authMiddleware";
import { ROLES } from "../data/roles";

const router = express.Router();

// Définition des routes pour l'API ec
router.post("/", authUser, authRole(ROLES.ADMIN), createEcHandler);
router.get("/", authUser, authRole(ROLES.ADMIN), findAllEcHandler);
router.get("/:id", authUser, authRole(ROLES.ADMIN), findEcByIdHandler);
router.put("/:id", authUser, authRole(ROLES.ADMIN), updateEcHandler);
router.delete("/:id", authUser, authRole(ROLES.ADMIN), deleteEcHandler);

export default router;
