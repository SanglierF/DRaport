import { Connection, getRepository, Repository } from "typeorm";
//entities
import { Warehouse } from "../entities/Warehouse";

export default class WarehouseRepository {
  private repository: Repository<Warehouse>;

  constructor(connection: Connection) {
    this.repository = connection.getRepository(Warehouse);
  }

  public async getAll() {
    const warehouseList = await this.repository.find();

    return warehouseList;
  }
  public async findById(warehouseId: number) {
    const warehouse = await this.repository.findOne(warehouseId);
    return warehouse;
  }
  public async save(warehouse: Warehouse) {
    return await this.repository.save(warehouse);
  }
  public async modify(warehouse: Warehouse) {
    return await this.repository.save(warehouse);
  }
  public create(
    nickname: string,
    nip: number = null,
    regon: number = null,
    name: string = "",
    tel_number: string = "",
    email: string = "",
  ) {
    return this.repository.create({
      nickname: nickname,
      name: name,
      nip: nip,
      regon: regon,
      tel_number: tel_number,
      email: email,
    });
  }
  public async delete(warehouseId: number) {
    this.repository.delete(warehouseId);
  }
}
