import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Workday } from "./Workday";
import { Client } from "./Client";
import { Order } from "./Order";

@Entity("Visit")
export class Visit {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ManyToOne(() => Workday, (workday) => workday.visits, {nullable: false, onDelete: "CASCADE"})
  workday: Workday;

  @ManyToOne(() => Client, (client) => client.visits, {nullable: false})
  client: Client;

  @Column({ length: 150, nullable: true })
  description: string;

  @Column({ nullable: true })
  visit_time: number;

  @OneToMany(() => Order, (order) => order.visit, {cascade: true })
  orders: Order[];

  @Column()
  uuid: string;
}
