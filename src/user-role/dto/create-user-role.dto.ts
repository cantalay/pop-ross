import { Role } from '../../common/enums/role.enum';
import { ObjectID } from 'typeorm';

export class CreateUserRoleDto {
  userID: ObjectID;
  artistID: ObjectID | null;
  role: Role;
}
