import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Ue } from "./ue.entity";

// Schema de la table User (Utilisateur)
@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  firstname: string;

  @Column({
    unique:true
  })
  identification: string;

  @Column() 
  password: string;

  @Column()
  role: string;

  @Column({
    unique: true
  })
  email: string;

  @Column()
  phone: string;

  @ManyToOne(() => Ue, (ue) => ue.users, { onDelete: "CASCADE", nullable: true })
  ue: Ue;
}
