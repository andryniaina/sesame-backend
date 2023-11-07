import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Ue } from "./ue.entity";

// Schema de la table sesamien
@Entity()
export class Ec {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Ue, (ue) => ue.ecs, {onDelete:'CASCADE'})
  ue: Ue
}
