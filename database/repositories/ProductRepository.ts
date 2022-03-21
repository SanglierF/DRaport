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
  public async findById(id: number) {
    const product = await this.repository.findOne(id);
    return product;
  }
  public async findByUuid(uuid: string) {
    return await this.repository.findOne({ where: { uuid: uuid } });
  }
  public async save(product: Product) {
    if (!product.uuid) {
      product.uuid = new Date().toISOString();
    }
    await this.repository.save(product);
    return await this.findByUuid(product.uuid);
  }
  public async saveAll(products: Product[]) {
    return await this.repository.save(products);
  }
  public async modify(product: Product) {
    return await this.repository.save(product);
  }
  public create(name: string, price: number, image: string = "") {
    return this.repository.create({
      name: name,
      price: price,
      image: image,
    });
  }
  public async delete(id: number) {
    this.repository.delete(id);
  }
}
