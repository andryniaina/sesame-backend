import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Ec } from "./ec.entity";
// Schema de la table sesamien
@Entity()
export class Ue {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Ec, (ec) => ec.ue)
  ecs: Ec[];
}
