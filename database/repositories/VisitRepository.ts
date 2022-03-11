import { Connection, Repository, Like } from "typeorm";

import { Visit } from "../entities/Visit";

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
  public create(workdayId: number, visitId: number, description:string="", visit_time:number=null ) {
    return this.repository.create({
      workdayId: workdayId,
      visitId: visitId,
      descirption: description,
      visit_time: visit_time
    });
  }
  public async delete(visitId: number) {
    this.repository.delete(visitId);
  }
}
