import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  nickname: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;
}
