import express from "express";
import {
  createUeHandler,
  findUeByIdHandler,
  findAllUeHandler,
  updateUeHandler,
  deleteUeHandler
} from "../controllers/ue.controller";

const router = express.Router();

// Définition des routes pour l'API ue
router.post("/", createUeHandler);
router.get("/",findAllUeHandler);
router.get("/:id", findUeByIdHandler);
router.put("/:id",updateUeHandler);
router.delete("/:id",deleteUeHandler)

export default router;
