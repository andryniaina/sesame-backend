import { Sesamien } from "../entities/sesamien.entity";
import { AppDataSource } from "../config/app-data-source";

// Connexion à la table sesamien
const sesamienRepository = AppDataSource.getRepository(Sesamien);

// Service de création d'un sesamien
export const createSesamien = async (input: Partial<Sesamien>) => {
  return await sesamienRepository.save(sesamienRepository.create(input));
};

// Service de mise à jour d'un sesamein
export const updateSesamien = async (id: string, input: Partial<Sesamien>) => {
  await sesamienRepository.update(id, input);
  return await sesamienRepository.findOneBy({ id });
};

// Service de recherche d'un sesamien à partir de son id
export const findSesamienById = async (id: string) => {
  return await sesamienRepository.findOneBy({ id });
};

// Service de recherche des notes complètes d'un sesamien à partir de son id
export const findSesamienFullGradesInfo = async (id: string) => {
  return await sesamienRepository.findOne({
    where: {
      id,
    },
    relations: {
      grades: {
        ec: {
          ue: true,
        },
      },
    },
  });
};

// Service de recherche de tous les sesamiens
export const findAllSesamien = async () => {
  return await sesamienRepository.find({
    relations: {
      grades: {
        ec: {
          ue: true,
        },
      },
    },
  });
};

// Service de suppression d'un sesamien
export const deleteSesamien = async (id: string) => {
  await sesamienRepository.delete(id);
};
