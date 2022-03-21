import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Order } from "./Order";

@Entity("Warehouse")
export class Warehouse {
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
  tel_number: string;

  @Column({ length: 50, nullable: true })
  email: string;

  @OneToMany(() => Order, (order) => order.visit)
  orders: Order[];

  @Column()
  uuid: string;
}
