import { User } from "../entities/user.entity";
import { AppDataSource } from "../config/app-data-source";

// Connexion à la table user
const userRepository = AppDataSource.getRepository(User);

// Service de création d'un user
export const createUser = async (input: Partial<User>) => {
  return await userRepository.save(userRepository.create(input));
};

// Service de mise à jour d'un user
export const updateUser = async (id: string, input: Partial<User>) => {
  await userRepository.update(id, input);
  return await userRepository.findOneBy({ id });
};

// Service de recherche d'un user à partir de son id
export const findUserById = async (id: string) => {
  return await userRepository.findOneOrFail({
    where: {
      id,
    },
    relations: {
      ue: true,
    },
  });
};

// Service de recherche d'un user à partir de son email
export const findUserByEmail = async (email: string) => {
  return await userRepository.findOneOrFail({
    where: {
      email,
    },
    relations: {
      ue: true,
    },
  });
};

// Service de recherche de tous les users
export const findAllUser = async () => {
  return await userRepository.find({
    relations: {
      ue: true,
    },
  });
};

// Service de recherche de tous les users selon leur role
export const findAllUserByRole = async (role: string) => {
  return await userRepository.find({
    where: {
      role
    },
    relations: {
      ue: true,
    },
  });
};

// Service de suppression d'un user
export const deleteUser = async (id: string) => {
  await userRepository.delete(id);
};
