import { createConnection, Connection } from "typeorm";

import { Client } from "./entities/Client";
import { Product } from "./entities/Product";
import { Warehouse } from "./entities/Warehouse";
import { Workday } from "./entities/Workday";
import { Visit } from "./entities/Visit";

export default class LocalDatabase {
  static dbInstance = null;
  dbConnection: Connection;

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
  static getInstance(){
    if(LocalDatabase.dbInstance===null){
      LocalDatabase.dbInstance= new LocalDatabase();
    }
    return this.dbInstance;
  }
  async awaitDbConnection() {
    while(this.dbConnection===undefined){
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    //console.log(this.dbConnection)
    return true
  }
}
async function DbConnection() {
  return await createConnection({
    name: "default",
    database: "lmaotest2",
    driver: require("expo-sqlite"),
    entities: [Client, Product, Warehouse, Workday, Visit],
    synchronize: true,
    type: "expo",
  });

}
