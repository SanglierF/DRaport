import { Connection, Repository, Like } from "typeorm";

import { Workday } from "../entities/Workday";

export default class WorkdayRepository {
  private repository: Repository<Workday>;

  constructor(connection: Connection) {
    this.repository = connection.getRepository(Workday);
  }

  public async getAll() {
    const workdayList = await this.repository.find();
    return workdayList;
  }
  public async getAllInMonth(month: string) {
    const workdayList = await this.repository.find({
      work_time_begin: Like(month + "%"),
    });
    return workdayList;
  }
  public async findById(id: number) {
    const workday = await this.repository.findOne(id);
    return workday;
  }
  public async findByDate(workdayDate: string) {
    const workday = await this.repository.findOne({
      work_time_begin: Like(workdayDate + "%"),
    });
    return workday;
  }
  public async findByUuid(uuid: string) {
    return await this.repository.findOne({ where: { uuid: uuid } });
  }
  public async save(workday: Workday) {
    if (!workday.uuid) {
      workday.uuid = new Date().toISOString();
    }
    await this.repository.save(workday);
    return await this.findByUuid(workday.uuid);
  }
  public async saveAll(workdays: Workday[]) {
    workdays.forEach((workday) => {
      if (!workday.uuid) {
        workday.uuid = new Date().toISOString();
      }
    });
    return await this.repository.save(workdays);
  }
  public async modify(workday: Workday) {
    return await this.repository.save(workday);
  }
  public create(work_time_begin, car_counter_begin: number = 0) {
    return this.repository.create({
      work_time_begin: work_time_begin,
      car_counter_begin: car_counter_begin,
    });
  }
  public async delete(id: number) {
    return await this.repository.delete(id);
  }
}
