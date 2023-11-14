import express from "express";
import {
  createSesamienHandler,
  findSesamienByIdHandler,
  findAllSesamienHandler,
  updateSesamienHandler,
  deleteSesamienHandler,
  getSesamienAverages,
} from "../controllers/sesamien.controller";
import { authRole, authUser } from "../middlewares/authMiddleware";
import { ROLES } from "../data/roles";

const router = express.Router();

// Définition des routes pour l'API sesamien
router.post("/", authUser, authRole(ROLES.ADMIN), createSesamienHandler);
router.get("/", findAllSesamienHandler);
router.post("/averages", getSesamienAverages);
router.get("/:id", findSesamienByIdHandler);
router.put("/:id", authUser, authRole(ROLES.ADMIN), updateSesamienHandler);
router.delete("/:id", authUser, authRole(ROLES.ADMIN), deleteSesamienHandler);

export default router;
