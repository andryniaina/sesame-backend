import { Request, Response } from "express";
import {
  createUe,
  findUeById,
  findAllUe,
  updateUe,
  deleteUe,
} from "../services/ue.service";
import asyncHandler from "express-async-handler";

// API de création d'un ue
export const createUeHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      const ue = await createUe({
        name,
      });
      res.status(201).json(ue);
    } catch (error) {
      throw new Error(error);
    }
  }
);

// API de mise à jour d'un sesamein
export const updateUeHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updates = Object.keys(req.body);
      const allowedUpdates = ["name"];
      const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
      );

      if (!isValidOperation) {
        res.status(400);
        throw new Error("Mise à jour invalide");
      }
      const input = {};
      updates.forEach((update) => (input[update] = req.body[update]));

      const ue = await updateUe(id, input);
      res.status(201).json(ue);
    } catch (error) {
      throw new Error(error);
    }
  }
);

// API de recherche d'un ue à partir de son id
export const findUeByIdHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const ue = await findUeById(id);
      res.status(200).json(ue);
    } catch (error) {
      throw new Error(error);
    }
  }
);

// API de recherche de tous les ues
export const findAllUeHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const ues = await findAllUe();
      res.status(200).json(ues);
    } catch (error) {
      throw new Error(error);
    }
  }
);

// API de suppression d'un ue
export const deleteUeHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await deleteUe(id);
      res.status(200).json({
        id,
        status: "Supprimé",
      });
    } catch (error) {
      throw new Error(error);
    }
  }
);
