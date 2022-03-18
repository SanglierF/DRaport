import { Connection, Repository } from "typeorm";

import { Visit } from "../entities/Visit";
import { Workday } from "../entities/Workday";
import { Client } from "../entities/Client";

export default class VisitRepository {
  private repository: Repository<Visit>;

  constructor(connection: Connection) {
    this.repository = connection.getRepository(Visit);
  }

  public async getAll() {
    const visitList = await this.repository.find();
    return visitList;
  }
  public async findById(id: number) {
    const visit = await this.repository.findOne(id);
    return visit;
  }
  public async save(visit: Visit) {
    return await this.repository.save(visit);
  }
  public async saveAll(visits: Visit[]) {
    return await this.repository.save(visits);
  }
  public async modify(visit: Visit) {
    return await this.repository.save(visit);
  }
  public create(
    workday: Workday,
    client: Client,
    description: string = "",
    visit_time: number = null
  ) {
    return this.repository.create({
      workday: workday,
      client: client,
      description: description,
      visit_time: visit_time,
    });
  }
  public async delete(id: number) {
    this.repository.delete(id);
  }
  public async getAllInDay(workday: Workday) {
    return this.repository.find({
      where: {
        workday: workday
      },
      relations: ["workday", "client"]
    });
  }
  public async findVisitByWorkdayClient(workday: Workday, client: Client){
    return this.repository.findOne({
      where: {
        workday: workday,
        client: client
      },
      relations: ["workday", "client"]
    });
    //TODO force one client visit per workday? or find other way of finding recent visit id
  }
}
