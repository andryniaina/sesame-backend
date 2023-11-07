// Chargement des variables d'environnements
const dotenv = require("dotenv").config();

import express from "express";
import { AppDataSource } from "./utils/app-data-source";
import cors from "cors";
import { errorHandler } from "./middlewares/errorMiddleware";
import sesamienRouter from "./routes/sesamien.routes";

// Initialisation de la connexion à la base de données
AppDataSource.initialize()
  .then(() => {
    console.log("Connexion à la base de données réussie");
  })
  .catch((err) => {
    console.error("Erreur lors de la connexion à la base de donnée:", err);
  });

// Creation de l'application Express
const app = express();
const port = process.env.PORT || 5000;

// Utilisation des middlewares permettant de recevoir du json et des données en form
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Utilisation du middleware cors pour autoriser les requetes externes
app.use(cors());

// Routes de l'api
app.use("/api/sesamien", sesamienRouter);

// Utilisation du middleware de gestion d'erreur
app.use(errorHandler);

// Lancement de l'application
app.listen(port, () => {
  console.log(`API Server actif sur le port ${port}`);
});
