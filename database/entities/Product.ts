import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("Product")
export class Product {
  @PrimaryGeneratedColumn("increment")
  productId: number;

  @Column({ length: 50 })
  name: string;

  @Column({ type: "float" })
  price: number;

  @Column({ nullable: true })
  image: string;
}
