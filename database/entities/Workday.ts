import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Visit } from "./Visit";

@Entity("Workday")
export class Workday {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "datetime", nullable: false })
  work_time_begin: string;

  @Column({ type: "datetime", nullable: true })
  work_time_end: string;

  @Column({ nullable: true })
  car_counter_begin: number;

  @Column({ nullable: true })
  car_counter_end: number;

  @OneToMany(() => Visit, (visit) => visit.workday)
  visits: Visit[];
}
