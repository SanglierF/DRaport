import { createConnection, Connection } from "typeorm";
//entities
import { Client } from "./entities/Client";
import { Product } from "./entities/Product";
import { Warehouse } from "./entities/Warehouse";
import { Workday } from "./entities/Workday";


export default class LocalDatabase {
  dbConnection: Connection;

  constructor() {
    DbConnection().then(
      value => {
        this.dbConnection = value;
      },
      () => {
        this.dbConnection = null;
      }
    );
  }
}
async function DbConnection() {
  return await createConnection({
    name: "default",
    database: "lmaotest",
    driver: require("expo-sqlite"),
    entities: [Client, Product, Warehouse, Workday],
    synchronize: true,
    type: "expo"
  });
}
