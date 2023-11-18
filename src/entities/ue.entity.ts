import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Code } from "typeorm";
import { Ec } from "./ec.entity";
import { User } from "./user.entity";

// Schema de la table ue (UNITE D ENSEIGNEMENT)
@Entity()
export class Ue {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  mention: string;

  @OneToMany(() => Ec, (ec) => ec.ue)
  ecs: Ec[];

  @OneToMany(() => User, (user) => user.ue)
  users: User[];
}
