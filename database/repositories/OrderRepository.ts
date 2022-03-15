import { Connection, Repository } from "typeorm";

import { Order } from "../entities/Order";
import { Visit } from "../entities/Visit";
import { Warehouse } from "../entities/Warehouse";

export default class OrderRepository {
  private repository: Repository<Order>;

  constructor(connection: Connection) {
    this.repository = connection.getRepository(Order);
  }

  public async getAll() {
    const orderList = await this.repository.find();
    return orderList;
  }
  public async findById(id: number) {
    const order = await this.repository.findOne(id);
    return order;
  }
  public async save(order: Order) {
    return await this.repository.save(order);
  }
  public async saveAll(orders: Order[]) {
    return await this.repository.save(orders);
  }
  public async modify(order: Order) {
    return await this.repository.save(order);
  }
  public create(visit: Visit, warehouse: Warehouse = null) {
    return this.repository.create({
      visit: visit,
      warehouse: warehouse,
    });
  }
  public async delete(id: number) {
    this.repository.delete(id);
  }
  public async getAllInVisit(visit: Visit) {
    return this.repository.find({
      where: {
        visit: visit,
      },
      relations: ["visit", "warehouse"],
    });
  }
}
