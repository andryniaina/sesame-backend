import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Sesamien } from "./sesamien.entity";
import { Ec } from "./ec.entity";

// Schema de la table gérant les notes
@Entity()
export class Grade {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Sesamien, (sesamien) => sesamien.grades, {
    onDelete: "CASCADE",
  })
  sesamien: Sesamien;

  @ManyToOne(() => Ec, (ec) => ec.grades, { onDelete: "CASCADE" })
  ec: Ec;

  @Column("decimal", { precision: 6, scale: 2 })
  cc: number;

  @Column("decimal", { precision: 6, scale: 2 })
  ct: number;

  @Column("decimal", { precision: 6, scale: 2 })
  average: number;

  @Column({ default: "Semestre 1" })
  semester: string;
}
