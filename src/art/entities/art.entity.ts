import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Art {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  userID: string;

  @Column()
  artistID: string;

  @Column()
  name: string;
}
