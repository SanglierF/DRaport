import { createConnection, Connection} from 'typeorm';
//entities
import { Product } from "./sqlite/entities/Product";

export default class LocalDatabase {
  dbConnection: Promise<Connection>;

  constructor(){
    this.dbConnection = DbConnection()
  }
}
 async function DbConnection() { // TODO either chceck if local setting and change for rest api
  return await createConnection({
    name: "default",
    database: "test",
    driver: require('expo-sqlite'),
    entities: [Product],
    synchronize: true,
    type: "expo"
  });
}
