import { Grade } from "../entities/grade.entity";
import { Ec } from "../entities/ec.entity";
import { Sesamien } from "../entities/sesamien.entity";
import { AppDataSource } from "../config/app-data-source";

// Connexion à la table note
const gradeRepository = AppDataSource.getRepository(Grade);

// Service de création d'une note
export const createGrade = async (
  input: Partial<Grade>,
  sesamien: Sesamien,
  ec: Ec
) => {
  const gradeCt: number = parseFloat(input.ct.toString());
  const gradeCc: number = parseFloat(input.cc.toString());
  const average: number = (gradeCt + gradeCc) / 2;
  return await gradeRepository.save(
    gradeRepository.create({ ...input, average, sesamien, ec })
  );
};

// Service de mise à jour d'une note
export const updateGrade = async (id: string, input: Partial<Grade>) => {
  await gradeRepository.update(id, input);
  return await gradeRepository.findOneBy({ id });
};

// Service de recherche d'un note à partir de son id
export const findGradeById = async (id: string) => {
  return await gradeRepository.findOne({
    where: {
      id,
    },
    relations: {
      sesamien: true,
      ec: true,
    },
  });
};

// Service de recherche de tous les notes
export const findAllGrade = async () => {
  return await gradeRepository.find({
    relations: {
      sesamien: true,
      ec: true,
    },
  });
};

// Service de suppression d'une note
export const deleteGrade = async (id: string) => {
  await gradeRepository.delete(id);
};

// Vérification si la note existe déjà
export const gradeExists = async (
  semester: string,
  sesamien: Sesamien,
  ec: Ec
) => {
  const grade = await gradeRepository.find({
    where: {
      semester,
      sesamien,
      ec,
    },
  });
  return !!grade.length;
};
