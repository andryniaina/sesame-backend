import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Ue } from "./ue.entity";
import { Grade } from "./grade.entity";

// Schema de la table ec
@Entity()
export class Ec {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Ue, (ue) => ue.ecs, {onDelete:'CASCADE'})
  ue: Ue

  @OneToMany(() => Grade, (grade) => grade.sesamien)
  grades: Grade[]
}
