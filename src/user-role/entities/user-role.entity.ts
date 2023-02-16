import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Role } from '../../common/enums/role.enum';

@Entity()
export class UserRole {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column('enum', { default: Role.User })
  role: Role;

  @ObjectIdColumn({ nullable: true })
  artistID: ObjectID | null;

  @ObjectIdColumn()
  userID: ObjectID;
}
