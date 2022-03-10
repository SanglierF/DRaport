import { Connection, Repository } from "typeorm";

import { Product } from "../entities/Product";

export default class ProductRepository {
  private repository: Repository<Product>;

  constructor(connection: Connection) {
    this.repository = connection.getRepository(Product);
  }

  public async getAll() {
    const productList = await this.repository.find();
    return productList;
  }
  public async findById(productId: number) {
    const product = await this.repository.findOne(productId);
    return product;
  }
  public async save(product: Product) {
    return await this.repository.save(product);
  }
  public async modify(product: Product) {
    return await this.repository.save(product);
  }
  public create(
    name: string,
    price: number,
    image: string = ""
  ) {
    return this.repository.create({
      name: name,
      price: price,
      image: image
    });
  }
  public async delete(productId: number) {
    this.repository.delete(productId);
  }
}
