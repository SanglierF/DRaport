import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Visit } from "./Visit";

@Entity("Client")
export class Client {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 50 })
  nickname: string;

  @Column({ length: 50, nullable: true })
  name: string;

  @Column({ type: "int", nullable: true })
  nip: number;

  @Column({ type: "int", nullable: true })
  regon: number;

  @Column({ length: 50, nullable: true })
  voivodeship: string;

  @Column({ length: 50, nullable: true })
  city: string;

  @Column({ length: 9, nullable: true })
  zip_code: string;

  @Column({ length: 50, nullable: true })
  street: string;

  @Column({ length: 50, nullable: true })
  tel_number: string;

  @Column({ type: "float", nullable: true })
  latitude: number;

  @Column({ type: "float", nullable: true })
  longitude: number;

  @OneToMany(() => Visit, (visit) => visit.client)
  visits: Visit[];

  @Column()
  uuid: string;
}
