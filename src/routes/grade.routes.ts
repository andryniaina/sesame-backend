import express from "express";
import {
  createGradeHandler,
  findGradeByIdHandler,
  findAllGradeHandler,
  updateGradeHandler,
  deleteGradeHandler
} from "../controllers/grade.controller";

const router = express.Router();

// Définition des routes pour l'API ec
router.post("/", createGradeHandler);
router.get("/",findAllGradeHandler);
router.get("/:id", findGradeByIdHandler);
router.put("/:id",updateGradeHandler);
router.delete("/:id",deleteGradeHandler)

export default router;
