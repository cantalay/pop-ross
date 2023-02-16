import { Column, ObjectID, ObjectIdColumn } from 'typeorm';

export class Artist {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  artistName: string;

  @Column()
  artistInfo: string;
}
