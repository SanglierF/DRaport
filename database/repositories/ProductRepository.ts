import { Connection, getRepository } from 'typeorm';
//entities
import { Product } from "../entities/Product";

export default class ProductRepository {
  private repository: Repository<Product>;

  constructor(connection: Connection){
    this.repository = connection.getRepository(Product);
  }

}
