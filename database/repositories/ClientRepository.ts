import { Connection, getRepository, Repository } from "typeorm";
//entities
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
  public async findById(clientId: number) {
    const client = await this.repository.findOne(clientId);
    return client;
  }
  public async save(client: Client) {
    return await this.repository.save(client);
  }
  public async modify(client: Client) {
    return await this.repository.save(client);
  }
  public create(
    nickname: string,
    nip: number = null,
    regon: number = null,
    name: string = "",
    voivodeship: string = "",
    city: string = "",
    zip_code: string = "",
    street: string = "",
    tel_number: string = "",
    longitude: number = null,
    latitude: number = null,


  ) {
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
  public async delete(clientId: number) {
    this.repository.delete(clientId);
  }
}
