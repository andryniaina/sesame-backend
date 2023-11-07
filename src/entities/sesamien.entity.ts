import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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
}
