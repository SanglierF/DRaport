import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { OrderedProduct } from "./OrderedProduct";

@Entity("Product")
export class Product {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ type: "decimal", scale: 2 })
  price: number;

  @Column({ nullable: true })
  image: string;

  @OneToMany(() => OrderedProduct, (orderedProduct) => orderedProduct.product, { cascade: true })
  orderedProducts: OrderedProduct[];

  @Column()
  uuid: string;
}
