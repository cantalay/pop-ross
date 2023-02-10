import { Column, ObjectID, ObjectIdColumn } from 'typeorm';
import { Role } from '../../common/enums/role.enum';

export class UserRole {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  userID: ObjectID;

  @Column()
  artistID: ObjectID;

  @Column()
  role: Role;
}
