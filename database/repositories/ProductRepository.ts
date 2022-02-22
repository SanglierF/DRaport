import { Connection, getRepository, Repository } from "typeorm";
//entities
import { Product } from "../entities/Product";

export default class ProductRepository {
  private repository: Repository<Product>;

  constructor(connection: Connection) {
    this.repository = connection.getRepository(Product);
  }

  public async getAll() {
    const productList = await this.repository.find();

    return productList
  }
  public async saveProduct(product: Product) {
    return await this.repository.save(product);
  }
  public create(productName: string, productPrice: number, productImage: string = ""){
    return  this.repository.create({
      name: productName,
      price: productPrice,
      image: productImage,
    })
  }
}
