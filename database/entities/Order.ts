import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Visit } from "./Visit";
import { Warehouse } from "./Warehouse";
import { OrderedProduct } from "./OrderedProduct";

@Entity("Order")
export class Order {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ManyToOne(() => Visit, (visit) => visit.orders, { nullable: false })
  visit: Visit;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.orders, { nullable: true })
  warehouse: Warehouse;

  @OneToMany(() => OrderedProduct, (orderedProduct) => orderedProduct.order)
  orderedProducts: OrderedProduct[];

  @Column()
  uuid: string;
}
