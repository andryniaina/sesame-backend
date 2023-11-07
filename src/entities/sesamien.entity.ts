import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Grade } from "./grade.entity";

// Schema de la table sesamien
@Entity()
export class Sesamien {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  firstname: string;

  @Column()
  age: number;

  @Column()
  mention: string;

  @Column()
  genre: string;

  @Column()
  region: string;

  @Column()
  promotion: string;

  @OneToMany(() => Grade, (grade) => grade.sesamien)
  grades: Grade[]
}
