import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Workday } from "./Workday";
import { Client } from "./Client";

@Entity("Visit")
export class Visit {
  @PrimaryGeneratedColumn("increment")
  visitId: number;

  @ManyToOne(() => Workday, (workday) => workday.visits, {nullable: false})
  workday: Workday;

  @ManyToOne(() => Client, (client) => client.visits, {nullable: false})
  client: Client;

  @Column({ length: 150, nullable: true })
  descirption: string;

  @Column({ nullable: true })
  visit_time: number;
}
