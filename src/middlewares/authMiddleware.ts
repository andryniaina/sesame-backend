import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { findUserById } from "../services/user.service";
import { NextFunction, Request, Response } from "express";

export const authUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        // Obtention du token depuis le header
        token = req.headers.authorization.split(" ")[1];

        // Verification du token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Obtention de l'user connecté
        req["user"] = await findUserById(decoded.id);

        next();
      } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error("Non authorisé");
      }
    }

    if (!token) {
      res.status(401);
      throw new Error("Non authorisé, pas de token");
    }
  }
);
