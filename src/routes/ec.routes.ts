import express from "express";
import {
  createEcHandler,
  findEcByIdHandler,
  findAllEcHandler,
  updateEcHandler,
  deleteEcHandler
} from "../controllers/ec.controller";

const router = express.Router();

// Définition des routes pour l'API ec
router.post("/", createEcHandler);
router.get("/",findAllEcHandler);
router.get("/:id", findEcByIdHandler);
router.put("/:id",updateEcHandler);
router.delete("/:id",deleteEcHandler)

export default router;
