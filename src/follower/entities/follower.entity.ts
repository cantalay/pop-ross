import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Follower {
  @ObjectIdColumn()
  _id: ObjectID;

  /*takip edilen*/
  @Column()
  followed: string;

  /*takip eden*/
  @Column()
  follower: string;
}
