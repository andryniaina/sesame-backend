// Chargement des variables d'environnements
const dotenv = require("dotenv").config();

import express from "express";
import { AppDataSource } from "./config/app-data-source";
import cors from "cors";
import { errorHandler } from "./middlewares/errorMiddleware";
import sesamienRouter from "./routes/sesamien.routes";
import ueRouter from "./routes/ue.routes";
import ecRouter from "./routes/ec.routes";
import gradeRouter from "./routes/grade.routes";
import userRouter from "./routes/user.routes";
import { insterdata } from "./data/initializeData";

// Initialisation de la connexion à la base de données
AppDataSource.initialize()
  .then(async() => {
    console.log("Connexion à la base de données réussie");

    //Insertion des données initiales
    await insterdata() ;
    
    // Creation de l'application Express
    const app = express();
    const port = process.env.PORT || 5000;

    // Utilisation des middlewares permettant de recevoir du json et des données en form
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // Utilisation du middleware cors pour autoriser les requetes externes
    app.use(cors());

    // Routes des différents APIs
    app.use("/api/sesamien", sesamienRouter);
    app.use("/api/ue", ueRouter);
    app.use("/api/ec", ecRouter);
    app.use("/api/grade", gradeRouter);
    app.use("/api/user", userRouter);

    // Utilisation du middleware de gestion d'erreur
    app.use(errorHandler);

    // Lancement de l'application
    app.listen(port, () => {
      console.log(`API Server actif sur le port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Erreur lors de la connexion à la base de donnée:", err);
  });
