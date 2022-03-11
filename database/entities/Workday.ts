import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("Workday")
export class Workday {
  @PrimaryGeneratedColumn("increment")
  workdayId: number;

  @Column({ type: "datetime", nullable: false })
  work_time_begin: string;

  @Column({ type: "datetime", nullable: true })
  work_time_end: string;

  @Column({ nullable: true} )
  car_counter_begin: number;

  @Column({ nullable: true })
  car_counter_end: number;
}
