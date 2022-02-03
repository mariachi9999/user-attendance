import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export class Attendance {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  start_time: string;

  @Column()
  end_time: string;

  @Column()
  date: string;

  @Column()
  notes: string;

  @Column()
  user_id: string;
}
