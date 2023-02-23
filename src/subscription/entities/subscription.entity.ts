import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Subscription {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  artistID: string;

  @Column()
  userID: string;
}
