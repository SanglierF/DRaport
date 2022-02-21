import { createConnection, Connection } from "typeorm";
//entities
import { Product } from "./entities/Product";

export default class LocalDatabase {
  dbConnection: Connection;

  constructor() {
    const connection = DbConnection().then(
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
  // TODO either chceck if local setting and change for rest api
  return await createConnection({
    name: "default",
    database: "test",
    driver: require("expo-sqlite"),
    entities: [Product],
    synchronize: true,
    type: "expo"
  });
}
