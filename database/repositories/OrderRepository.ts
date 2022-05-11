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
  public async findByUuid(uuid: string) {
    return await this.repository.findOne({ where: { uuid: uuid } });
  }
  public async save(order: Order) {
    if (!order.uuid) {
      order.uuid = new Date().toISOString();
    }
    await this.repository.save(order);
    return await this.findByUuid(order.uuid);
  }
  public async saveAll(orders: Order[]) {
    orders.forEach((order) => {
      if (!order.uuid) {
        order.uuid = new Date().toISOString();
      }
    });
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
