import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { OrderedProduct } from "./OrderedProduct";

@Entity("Product")
export class Product {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ type: "float" })
  price: number;

  @Column({ nullable: true })
  image: string;

  @OneToMany(() => OrderedProduct, (orderedProduct) => orderedProduct.product)
  orderedProducts: OrderedProduct[];

  @Column()
  uuid: string;
}
