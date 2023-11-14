import { Ec } from "../entities/ec.entity";
import { Ue } from "../entities/ue.entity";
import { AppDataSource } from "../config/app-data-source";

// Connexion à la table ec
const ecRepository = AppDataSource.getRepository(Ec);

// Service de création d'un ec
export const createEc = async (input: Partial<Ec>, ue: Ue) => {
  return await ecRepository.save(ecRepository.create({ ...input, ue }));
};

// Service de mise à jour d'un ec
export const updateEc = async (id: string, input: Partial<Ec>) => {
  await ecRepository.update(id, input);
  return await ecRepository.findOneBy({ id });
};

// Service de recherche d'un ec à partir de son id
export const findEcById = async (id: string) => {
  return await ecRepository.findOneOrFail({
    where: {
      id,
    },
    relations: {
      ue: true,
    },
  });
};

// Service de recherche de tous les ecs
export const findAllEc = async () => {
  return await ecRepository.find({
    relations: {
      ue: true,
    },
  });
};

// Service de suppression d'un ec
export const deleteEc = async (id: string) => {
  await ecRepository.delete(id);
};
