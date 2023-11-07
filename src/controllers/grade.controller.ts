import { Request, Response } from "express";
import {
  createGrade,
  findGradeById,
  findAllGrade,
  updateGrade,
  deleteGrade,
  gradeExists,
} from "../services/grade.service";
import { findEcById } from "../services/ec.service";
import { findSesamienById } from "../services/sesamien.service";
import semesters from "../data/semesters";
import asyncHandler from "express-async-handler";

// API de création d'une note
export const createGradeHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { cc, ct, semester, sesamienId, ecId } = req.body;
      if (!semesters.includes(semester)) {
        res.status(400);
        throw "Semestre selectionné invalide";
      }
      const sesamien = await findSesamienById(sesamienId);
      const ec = await findEcById(ecId);
      if (await gradeExists(semester, sesamien, ec)) {
        res.status(400);
        throw "Note déjà ajoutée";
      }
      const grade = await createGrade(
        {
          cc,
          ct,
          semester,
        },
        sesamien,
        ec
      );
      res.status(201).json(grade);
    } catch (error) {
      throw new Error(error);
    }
  }
);

// API de mise à jour d'une note
export const updateGradeHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updates = Object.keys(req.body);
      const allowedUpdates = ["semester", "cc", "ct"];
      const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
      );

      if (!isValidOperation) {
        res.status(400);
        throw "Mise à jour invalide";
      }
      const input = {};
      updates.forEach((update) => (input[update] = req.body[update]));

      const grade = await updateGrade(id, input);
      res.status(200).json(grade);
    } catch (error) {
      throw new Error(error);
    }
  }
);

// API de recherche d'une note à partir de son id
export const findGradeByIdHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const grade = await findGradeById(id);
      res.status(200).json(grade);
    } catch (error) {
      throw new Error(error);
    }
  }
);

// API de recherche de tous les notes
export const findAllGradeHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const ecs = await findAllGrade();
      res.status(200).json(ecs);
    } catch (error) {
      throw new Error(error);
    }
  }
);

// API de suppression d'une note
export const deleteGradeHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await deleteGrade(id);
      res.status(200).json({
        id,
        status: "Supprimé",
      });
    } catch (error) {
      throw new Error(error);
    }
  }
);
