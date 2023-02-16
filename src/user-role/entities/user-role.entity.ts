import { Column, ObjectID, ObjectIdColumn } from 'typeorm';
import { Role } from '../../common/enums/role.enum';

export class UserRole {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column('enum', { default: Role.User })
  role: Role;

  @Column()
  artistID: string | null;

  @Column()
  userID: string;
}
