import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Visit } from "./Visit";
import { Warehouse } from "./Warehouse";

@Entity("Order")
export class Order {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ManyToOne(() => Visit, (visit) => visit.orders, { nullable: false })
  visit: Visit;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.orders, { nullable: true })
  warehouse: Warehouse;
}
