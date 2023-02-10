import { ObjectID } from 'typeorm';
import { Role } from '../../common/enums/role.enum';

export class CreateUserRoleDto {
  userID: ObjectID;
  artistID: ObjectID;
  role: Role;
}
