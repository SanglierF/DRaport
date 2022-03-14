import { Connection, Repository } from "typeorm";

import { Client } from "../entities/Client";

export default class ClientRepository {
  private repository: Repository<Client>;

  constructor(connection: Connection) {
    this.repository = connection.getRepository(Client);
  }

  public async getAll() {
    const clientList = await this.repository.find();
    return clientList;
  }
  public async findById(id: number) {
    const client = await this.repository.findOne(id);
    return client;
  }
  public async save(client: Client) {
    return await this.repository.save(client);
  }
  public async saveAll(clients: Client[]) {
    return await this.repository.save(clients);
  }
  public async modify(client: Client) {
    return await this.repository.save(client);
  }
  public create({
    nickname,
    nip = null,
    regon = null,
    name = "",
    voivodeship = "",
    city = "",
    zip_code = "",
    street = "",
    tel_number = "",
    longitude = null,
    latitude = null,
  }) {
    return this.repository.create({
      nickname: nickname,
      name: name,
      nip: nip,
      regon: regon,
      voivodeship: voivodeship,
      city: city,
      zip_code: zip_code,
      street: street,
      tel_number: tel_number,
      latitude: latitude,
      longitude: longitude,
    });
  }
  public async delete(id: number) {
    this.repository.delete(id);
  }
}
