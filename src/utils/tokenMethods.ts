import jwt from "jsonwebtoken";

// Fonction permettant de générer un token qui sera nécessaire à l'authentification
export const generateToken = (id: String) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
