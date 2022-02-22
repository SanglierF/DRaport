import { createConnection, Connection } from "typeorm";
//entities
import { Product } from "./entities/Product";

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
    entities: [Product],
    synchronize: true,
    type: "expo"
  });
}
