import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("Workday")
export class Workday {
  @PrimaryGeneratedColumn("increment")
  workdayId: number;

  @Column({ type: "datetime", unique: true })
  date: string;

  @Column({ type: "datetime" })
  work_time_beign: string;

  @Column({ type: "datetime", nullable: true })
  work_time_end: string;

  @Column()
  car_counter_begin: number;

  @Column({ nullable: true })
  car_counter_end: number;
}
