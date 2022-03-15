import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Order } from "./Order";
import { Product } from "./Product";

@Entity("OrderedProduct")
export class OrderedProduct {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ManyToOne(() => Order, (order) => order.orderedProducts, { nullable: false })
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderedProducts, { nullable: false })
  product: Product;

  @Column({ nullable: false })
  quantity: number;
}
