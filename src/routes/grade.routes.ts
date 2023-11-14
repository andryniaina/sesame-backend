import express from "express";
import {
  createGradeHandler,
  findGradeByIdHandler,
  findAllGradeHandler,
  updateGradeHandler,
  deleteGradeHandler,
} from "../controllers/grade.controller";
import { authRole, authUser } from "../middlewares/authMiddleware";
import { ROLES } from "../data/roles";

const router = express.Router();

// Définition des routes pour l'API ec
router.post("/", authUser, authRole(ROLES.PROF), createGradeHandler);
router.get("/", findAllGradeHandler);
router.get("/:id", findGradeByIdHandler);
router.put("/:id", authUser, authRole(ROLES.PROF), updateGradeHandler);
router.delete("/:id", authUser, authRole(ROLES.PROF), deleteGradeHandler);

export default router;
