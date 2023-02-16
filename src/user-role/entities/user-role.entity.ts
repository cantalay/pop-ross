import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Role } from '../../common/enums/role.enum';

@Entity()
export class UserRole {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column('enum', { default: Role.User })
  role: Role;

  @Column()
  artistID: string;

  @Column({
    unique: true,
  })
  userID: string;
}
