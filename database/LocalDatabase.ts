import { createConnection, Connection } from "typeorm";

import { Client } from "./entities/Client";
import { Product } from "./entities/Product";
import { Warehouse } from "./entities/Warehouse";
import { Workday } from "./entities/Workday";
import { Visit } from "./entities/Visit";

import ClientRepository from "./repositories/ClientRepository";
import ProductRepository from "./repositories/ProductRepository";
import VisitRepository from "./repositories/VisitRepository";
import WorkdayRepository from "./repositories/WorkdayRepository";
import WarehouseRepository from "./repositories/WarehouseRepository";

export default class LocalDatabase {
  static dbInstance = null;
  dbConnection: Connection;
;

  constructor() {
    DbConnection().then(
      (value) => {
        this.dbConnection = value;
      },
      () => {
        this.dbConnection = null;
      }
    );
  }
  async awaitDbConnection() {
    while (this.dbConnection === undefined) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    return true;
  }
  async populateDatabase() {
    let initalized = false;
    // Repositories
    const clientRepository = new ClientRepository(this.dbConnection);
    const productRepository = new ProductRepository(this.dbConnection);
    const visitRepository = new VisitRepository(this.dbConnection);
    const workdayRepository = new WorkdayRepository(this.dbConnection);
    const warehouseRepository = new WarehouseRepository(this.dbConnection);
    // products
    const product1 = productRepository.create("Product1", 21.37);
    const product2 = productRepository.create("Product2", 14.72);
    const product3 = productRepository.create("Product3", 123.88);
    // warehouses
    const warehouse1 = warehouseRepository.create({
      nickname: "Warehouse1",
      nip: 123123123,
      regon: 123123123,
      name: "Full Warehouse1",
    });
    const warehouse2 = warehouseRepository.create({
      nickname: "Warehouse2",
      nip: 123123123,
      regon: 123123123,
      name: "Full Warehouse2",
    });
    const warehouse3 = warehouseRepository.create({
      nickname: "Warehouse3",
      nip: 123123123,
      regon: 123123123,
      name: "Full Warehouse3",
    });
    // clients
    const client1 = clientRepository.create({ nickname: "Client1", name: "Full Client1" });
    const client2 = clientRepository.create({ nickname: "Client2", name: "Full Client2" });
    const client3 = clientRepository.create({ nickname: "Client3", name: "Full Client3" });
    // workdays
    const workday1 = workdayRepository.create({ work_time_Begin: "2022-03-08T00:00:00.000Z" });
    const workday2 = workdayRepository.create({ work_time_Begin: "2022-03-09T00:00:00.000Z" });
    const workday3 = workdayRepository.create({ work_time_Begin: "2022-03-02T00:00:00.000Z" });
    // visits
    // save all
    let found = await productRepository.getAll();
    if (found.length < 1) {
      await productRepository.saveAll([product1, product2, product3]);
      await warehouseRepository.saveAll([warehouse1, warehouse2, warehouse3]);
      await clientRepository.saveAll([client1, client2, client3]);
      await workdayRepository.saveAll([workday1, workday2, workday3]);
      initalized = true;
    }
    return initalized;
  }
  static getInstance() {
    if (LocalDatabase.dbInstance === null) {
      LocalDatabase.dbInstance = new LocalDatabase();
    }
    return this.dbInstance;
  }
}
async function DbConnection() {
  return await createConnection({
    name: "default",
    database: "develop",
    driver: require("expo-sqlite"),
    entities: [Client, Product, Warehouse, Workday, Visit],
    synchronize: true,
    type: "expo",
  });
}
