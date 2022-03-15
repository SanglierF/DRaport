import { Connection, Repository } from "typeorm";

import { OrderedProduct } from "../entities/OrderedProduct";
import { Order } from "../entities/Order";
import { Product } from "../entities/Product";

export default class OrderedProductRepository {
  private repository: Repository<OrderedProduct>;

  constructor(connection: Connection) {
    this.repository = connection.getRepository(OrderedProduct);
  }

  public async getAll() {
    const orderedProductList = await this.repository.find();
    return orderedProductList;
  }
  public async findById(id: number) {
    const orderedProduct = await this.repository.findOne(id);
    return orderedProduct;
  }
  public async save(orderedProduct: OrderedProduct) {
    return await this.repository.save(orderedProduct);
  }
  public async saveAll(orderedProducts: OrderedProduct[]) {
    return await this.repository.save(orderedProducts);
  }
  public async modify(orderedProduct: OrderedProduct) {
    return await this.repository.save(orderedProduct);
  }
  public create(order: Order, product: Product, quantity: number) {
    return this.repository.create({
      order: order,
      product: product,
      quantity: quantity,
    });
  }
  public async delete(id: number) {
    this.repository.delete(id);
  }
  public async getAllInOrder(order: Order) {
    return this.repository.find({
      where: {
        order: order,
      },
      relations: ["order", "product"],
    });
  }
}
