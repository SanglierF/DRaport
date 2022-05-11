import { createConnection, Connection } from "typeorm";

import { Client } from "./entities/Client";
import { Product } from "./entities/Product";
import { Warehouse } from "./entities/Warehouse";
import { Workday } from "./entities/Workday";
import { Visit } from "./entities/Visit";
import { Order } from "./entities/Order";
import { OrderedProduct } from "./entities/OrderedProduct";

import ClientRepository from "./repositories/ClientRepository";
import ProductRepository from "./repositories/ProductRepository";
import VisitRepository from "./repositories/VisitRepository";
import WorkdayRepository from "./repositories/WorkdayRepository";
import WarehouseRepository from "./repositories/WarehouseRepository";
import OrderRepository from "./repositories/OrderRepository";
import OrderedProductRepository from "./repositories/OrderedProductRepository";

export default class LocalDatabase {
  static dbInstance = null;
  private _clientRepository: ClientRepository = null;
  public get clientRepository(): ClientRepository {
    return this._clientRepository;
  }
  private _productRepository: ProductRepository = null;
  public get productRepository(): ProductRepository {
    return this._productRepository;
  }
  private _visitRepository: VisitRepository = null;
  public get visitRepository(): VisitRepository {
    return this._visitRepository;
  }
  private _workdayRepository: WorkdayRepository = null;
  public get workdayRepository(): WorkdayRepository {
    return this._workdayRepository;
  }
  private _warehouseRepository: WarehouseRepository = null;
  public get warehouseRepository(): WarehouseRepository {
    return this._warehouseRepository;
  }
  private _orderRepository: OrderRepository = null;
  public get orderRepository(): OrderRepository {
    return this._orderRepository;
  }
  private _orderedProductRepository: OrderedProductRepository = null;
  public get orderedProductRepository(): OrderedProductRepository {
    return this._orderedProductRepository;
  }

  dbConnection: Connection;
  constructor() {
    this.dbConnection = null;
  }
  async initialize() {
    try {
      const dbConnection = await DbConnection();
      this.dbConnection = dbConnection;
      this._clientRepository = new ClientRepository(this.dbConnection);
      this._productRepository = new ProductRepository(this.dbConnection);
      this._visitRepository = new VisitRepository(this.dbConnection);
      this._workdayRepository = new WorkdayRepository(this.dbConnection);
      this._warehouseRepository = new WarehouseRepository(this.dbConnection);
      this._orderRepository = new OrderRepository(this.dbConnection);
      this._orderedProductRepository = new OrderedProductRepository(this.dbConnection);
    } catch (error) {
      console.log(error);
      this.dbConnection = null;
    }
    if (!this.dbConnection) return console.log("Database broken");
    return this.dbConnection;
  }
  async awaitDbConnection() {
    while (!this.dbConnection) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    return true;
  }
  async populateDatabase() {
    let initalized = false;
    // products
    const product1 = this.productRepository.create("Product1", 21.37);
    const product2 = this.productRepository.create("Product2", 14.72);
    const product3 = this.productRepository.create("Product3", 123.88);
    // warehouses
    const warehouse1 = this.warehouseRepository.create({
      nickname: "Warehouse1",
      nip: 123123123,
      regon: 123123123,
      name: "Full Warehouse1",
    });
    const warehouse2 = this.warehouseRepository.create({
      nickname: "Warehouse2",
      nip: 123123123,
      regon: 123123123,
      name: "Full Warehouse2",
    });
    const warehouse3 = this.warehouseRepository.create({
      nickname: "Warehouse3",
      nip: 123123123,
      regon: 123123123,
      name: "Full Warehouse3",
    });
    // clients
    const client1 = this.clientRepository.create({ nickname: "Client1", name: "Full Client1" });
    const client2 = this.clientRepository.create({ nickname: "Client2", name: "Full Client2" });
    const client3 = this.clientRepository.create({ nickname: "Client3", name: "Full Client3" });
    // workdays
    const workday1 = this.workdayRepository.create({ work_time_Begin: "2022-03-08T00:00:00.000Z" });
    const workday2 = this.workdayRepository.create({ work_time_Begin: "2022-03-09T00:00:00.000Z" });
    const workday3 = this.workdayRepository.create({ work_time_Begin: "2022-03-02T00:00:00.000Z" });
    // visits
    // save all
    let found = await this.productRepository.getAll();
    if (found.length < 1) {
      await this.productRepository.saveAll([product1, product2, product3]);
      await this.warehouseRepository.saveAll([warehouse1, warehouse2, warehouse3]);
      await this.clientRepository.saveAll([client1, client2, client3]);
      await this.workdayRepository.saveAll([workday1, workday2, workday3]);
      initalized = true;
    }
    return initalized;
  }
  static getInstance(): LocalDatabase {
    if (LocalDatabase.dbInstance === null) {
      LocalDatabase.dbInstance = new LocalDatabase();
    }
    return this.dbInstance;
  }
}
async function DbConnection() {
  return await createConnection({
    name: "default",
    database: "dev",
    driver: require("expo-sqlite"),
    entities: [Client, Product, Warehouse, Workday, Visit, Order, OrderedProduct],
    synchronize: true,
    type: "expo",
  });
}
