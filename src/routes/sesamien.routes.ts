import * as express from "express";
import {
  createSesamienHandler,
  findSesamienByIdHandler,
  findAllSesamienHandler,
  updateSesamienHandler,
  deleteSesamienHandler
} from "../controllers/sesamien.controller";

const router = express.Router();

// Définition des routes pour l'API sesamien
router.post("/", createSesamienHandler);
router.get("/",findAllSesamienHandler);
router.get("/:id", findSesamienByIdHandler);
router.put("/:id",updateSesamienHandler);
router.delete("/:id",deleteSesamienHandler)

export default router;
