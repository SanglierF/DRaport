import { Connection, Repository } from "typeorm";

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
  public async findById(id: number) {
    const warehouse = await this.repository.findOne(id);
    return warehouse;
  }
  public async findByUuid(uuid: string) {
    return await this.repository.findOne({ where: { uuid: uuid } });
  }
  public async save(warehouse: Warehouse) {
    if (!warehouse.uuid) {
      warehouse.uuid = new Date().toISOString();
    }
    await this.repository.save(warehouse);
    return await this.findByUuid(warehouse.uuid);
  }
  public async saveAll(warehouses: Warehouse[]) {
    return await this.repository.save(warehouses);
  }
  public async modify(warehouse: Warehouse) {
    return await this.repository.save(warehouse);
  }
  public create({ nickname, nip = null, regon = null, name = "", tel_number = "", email = "" }) {
    return this.repository.create({
      nickname: nickname,
      name: name,
      nip: nip,
      regon: regon,
      tel_number: tel_number,
      email: email,
    });
  }
  public async delete(id: number) {
    this.repository.delete(id);
  }
}
