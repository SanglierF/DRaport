import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('Warehouse')
export class Warehouse {
  @PrimaryGeneratedColumn('increment')
  warehouseId: number;

  @Column({length: 50})
  nickname: string;

  @Column({length: 50, nullable: true})
  name: string;

  @Column({type: "int", nullable: true})
  nip: number;

  @Column({type: "int", nullable: true})
  regon: number;

  @Column({length: 50, nullable: true})
  tel_number: string;

  @Column({length: 50, nullable: true})
  email: string;
}
