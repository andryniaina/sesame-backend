import { Request, Response } from "express";
import {
  createEc,
  findEcById,
  findAllEc,
  updateEc,
  deleteEc,
} from "../services/ec.service";
import { findUeById } from "../services/ue.service";
import asyncHandler from "express-async-handler";

// API de création d'un ec
export const createEcHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { name, ueId } = req.body;
      const ue = await findUeById(ueId);
      const ec = await createEc(
        {
          name,
        },
        ue
      );
      res.status(201).json(ec);
    } catch (error) {
      throw new Error(error);
    }
  }
);

// API de mise à jour d'un sesamein
export const updateEcHandler = asyncHandler(
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

      const ec = await updateEc(id, input);
      res.status(201).json(ec);
    } catch (error) {
      throw new Error(error);
    }
  }
);

// API de recherche d'un ec à partir de son id
export const findEcByIdHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const ec = await findEcById(id);
      res.status(200).json(ec);
    } catch (error) {
      throw new Error(error);
    }
  }
);

// API de recherche de tous les ecs
export const findAllEcHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const ecs = await findAllEc();
      res.status(200).json(ecs);
    } catch (error) {
      throw new Error(error);
    }
  }
);

// API de suppression d'un ec
export const deleteEcHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await deleteEc(id);
      res.status(200).json({
        id,
        status: "Supprimé",
      });
    } catch (error) {
      throw new Error(error);
    }
  }
);
