import { Column, ObjectID, ObjectIdColumn } from 'typeorm';

export class CreateArtistDto {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  artistName: string;

  @Column()
  artistInfo: string;
}
