import { Connection, Repository } from "typeorm";

import { Visit } from "../entities/Visit";
import { Workday } from "../entities/Workday"
import { Client } from "../entities/Client"

export default class VisitRepository {
  private repository: Repository<Visit>;

  constructor(connection: Connection) {
    this.repository = connection.getRepository(Visit);
  }

  public async getAll() {
    const visitList = await this.repository.find();
    return visitList;
  }
  public async findById(visitId: number) {
    const visit = await this.repository.findOne(visitId);
    return visit;
  }
  public async save(visit: Visit) {
    return await this.repository.save(visit);
  }
  public async modify(visit: Visit) {
    return await this.repository.save(visit);
  }
  public create(workday: Workday, client: Client, description:string="", visit_time:number=null ) {
    return this.repository.create({
      workday: workday,
      client: client,
      description: description,
      visit_time: visit_time
    });
  }
  public async delete(visitId: number) {
    this.repository.delete(visitId);
  }
}
