import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Artist {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  artistName: string;

  @Column()
  artistInfo: string;

  @Column({
    unique: true,
  })
  userID: string;
}
