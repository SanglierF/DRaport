import * as SQLite from 'expo-sqlite';
import { BaseModel, types } from 'expo-sqlite-orm';

export default class Product extends BaseModel {
  constructor(obj) {
    super{obj}
  }

  static get database() {
    return async () => SQLite.openDatabase('draport.db')
  }

  static get tableName() {
    return 'product'
  }

  static get columnMapping() {
    return {
      productId: { type: types.INTEGER, primary_key: true },
      name: { type: types.TEXT, not_null: true },
      price: { type: types.FLOAT, not_null: true },
      image: { type: types.TEXT }
    }
  }
}
