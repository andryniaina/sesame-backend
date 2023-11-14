import express from "express";
import {
  createSesamienHandler,
  findSesamienByIdHandler,
  findAllSesamienHandler,
  updateSesamienHandler,
  deleteSesamienHandler,
  getSesamienAverages
} from "../controllers/sesamien.controller";

const router = express.Router();

// Définition des routes pour l'API sesamien
router.post("/", createSesamienHandler);
router.get("/",findAllSesamienHandler);
router.post("/averages",getSesamienAverages);
router.get("/:id", findSesamienByIdHandler);
router.put("/:id",updateSesamienHandler);
router.delete("/:id",deleteSesamienHandler)

export default router;
