import { Ue } from "../entities/ue.entity";
import { AppDataSource } from "../config/app-data-source";

// Connexion à la table ue
const ueRepository = AppDataSource.getRepository(Ue);

// Service de création d'un ue
export const createUe = async (input: Partial<Ue>) => {
  return await ueRepository.save(ueRepository.create(input));
};

// Service de mise à jour d'un ue
export const updateUe = async (id: string, input: Partial<Ue>) => {
  await ueRepository.update(id, input);
  return await ueRepository.findOneBy({ id });
};

// Service de recherche d'un ue à partir de son id
export const findUeById = async (id: string) => {
  return await ueRepository.findOneOrFail({
    where: {
      id,
    },
    relations: {
      ecs: true,
    },
  });
};

// Service de recherche de tous les ues
export const findAllUe = async () => {
  return await ueRepository.find({
    relations: {
      ecs: true,
    },
  });
};

// Service de suppression d'un ue
export const deleteUe = async (id: string) => {
  await ueRepository.delete(id);
};
