import { Request, Response } from "express";
import {
  createUser,
  findUserById,
  findAllUser,
  updateUser,
  deleteUser,
  findUserByEmail,
  findAllUserByRole,
} from "../services/user.service";
import { generateToken } from "../utils/tokenMethods";
import { findUeById } from "../services/ue.service";
import asyncHandler from "express-async-handler";
import { ROLES } from "../data/roles";

// API de création d'un user
export const createUserHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const {
        name,
        firstname,
        identification,
        password,
        role,
        email,
        phone,
        ueId,
      } = req.body;

      // Vérification de la validité du champ ROLE
      if (!Object.values(ROLES).includes(role)) {
        res.status(400);
        throw "Role affecté invalide";
      }
      if (role === ROLES.PROF && !ueId) {
        res.status(400);
        throw "Un professeur doit etre affecté à un UE";
      }

      // Ajout du champ UE si existant
      const additionnalProperties = {};
      if (ueId) {
        const ue = await findUeById(ueId);
        additionnalProperties["ue"] = ue;
      }
      const user = await createUser({
        name,
        firstname,
        identification,
        password,
        role,
        email,
        phone,
        ...additionnalProperties,
      });
      res.status(201).json({ ...user, token: generateToken(user.id) });
    } catch (error) {
      throw new Error(error);
    }
  }
);

// API de connexion d'un user
export const loginUserHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      if (!email) {
        res.status(400);
        throw "Veuillez fournir votre email";
      }
      if (!password) {
        res.status(400);
        throw "Veuillez saisir votre mot de passe";
      }
      const user = await findUserByEmail(email);

      if (!user) {
        res.status(401);
        throw "Compte inexistant";
      }

      if (password.toString() === user.password.toString()) {
        res.status(200).json({
          ...user,
          token: generateToken(user.id),
        });
      } else {
        res.status(401);
        throw "Mot de passe incorrect";
      }
    } catch (error) {
      throw new Error(error);
    }
  }
);

// API de récupération de l'user authetifié
export const getAuthUserHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      if (!req["user"]) {
        res.status(401);
        throw "Non autentifié";
      }
      res.status(200).json(req["user"]);
    } catch (error) {
      throw new Error(error);
    }
  }
);

// API de mise à jour d'un user
export const updateUserHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updates = Object.keys(req.body);
      // Liste des champs modifiables
      const allowedUpdates = [
        "name",
        "firstname",
        "identification",
        "password",
        "role",
        "email",
        "phone",
        "ueId",
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

      if (input["ueId"]) {
        const ue = await findUeById(input["ueId"]);
        delete input["ueId"];
        input["ue"] = ue;
      }
      if (input["role"]) {
        if (!Object.values(ROLES).includes(input["role"])) {
          res.status(400);
          throw "Role affecté invalide";
        }
      }

      const user = await updateUser(id, input);
      res.status(200).json(user);
    } catch (error) {
      throw new Error(error);
    }
  }
);

// API de recherche d'un user à partir de son id
export const findUserByIdHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await findUserById(id);
      res.status(200).json(user);
    } catch (error) {
      throw new Error(error);
    }
  }
);

// API de recherche de tous les users
export const findAllUserHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const users = await findAllUser();
      res.status(200).json(users);
    } catch (error) {
      throw new Error(error);
    }
  }
);

// API de recherche de tous les professeurs
export const findAllProfHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const users = await findAllUserByRole(ROLES.PROF);
      res.status(200).json(users);
    } catch (error) {
      throw new Error(error);
    }
  }
);

// API de suppression d'un user
export const deleteUserHandler = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await deleteUser(id);
      res.status(200).json({
        id,
        status: "Supprimé",
      });
    } catch (error) {
      throw new Error(error);
    }
  }
);
