import { Request, Response } from "express";
import {
  createSesamien,
  findAllSesamien,
  updateSesamien,
  deleteSesamien,
  findSesamienWithAverages
} from "../services/sesamien.service";
import { filterStudentsByUeAndSemesterAndClassifyThem } from "../utils/gradesCalculation";
import asyncHandler from "express-async-handler";

// API de création d'un sesamien
export const createSesamienHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { name, firstname, age, mention, genre, region, promotion } =
        req.body;
      const sesamien = await createSesamien({
        name,
        firstname,
        age,
        mention,
        genre,
        region,
        promotion,
      });
      res.status(201).json(sesamien);
    } catch (error) {
      throw new Error(error);
    }
  }
);

// API de mise à jour d'un sesamein
export const updateSesamienHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updates = Object.keys(req.body);
      // Liste des champs modifiables
      const allowedUpdates = [
        "name",
        "firstname",
        "age",
        "mention",
        "genre",
        "region",
        "promotion",
      ];
      const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
      );

      if (!isValidOperation) {
        res.status(400);
        throw "Mise à jour invalide";
      }
      const input = {};
      updates.forEach((update) => (input[update] = req.body[update]));

      const sesamien = await updateSesamien(id, input);
      res.status(200).json(sesamien);
    } catch (error) {
      throw new Error(error);
    }
  }
);

// API de recherche d'un sesamien à partir de son id
export const findSesamienByIdHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const sesamien = await findSesamienWithAverages(id);
      res.status(200).json(sesamien);
    } catch (error) {
      throw new Error(error);
    }
  }
);

// API de recherche de tous les sesamiens
export const findAllSesamienHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const sesamiens = await findAllSesamien();
      res.status(200).json(sesamiens);
    } catch (error) {
      throw new Error(error);
    }
  }
);

// API de récupération des sésamiens et de leurs moyennes selon l'UE et le semestre
export const getSesamienAverages = asyncHandler(
  async (req: Request, res: Response)=> {
    try {
      const {ueId, semester} = req.body;
      console.log(req.body)
      //récupération des sésamiens
      let sesamiens = await findAllSesamien();
      //filtrage par UE et semestre
      sesamiens = filterStudentsByUeAndSemesterAndClassifyThem(sesamiens,ueId,semester) ;
      res.status(200).json(sesamiens);
    } catch(error) {
      throw new Error(error) ;
    }
  }
)

// API de suppression d'un sesamien
export const deleteSesamienHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await deleteSesamien(id);
      res.status(200).json({
        id,
        status: "Supprimé",
      });
    } catch (error) {
      throw new Error(error);
    }
  }
);
