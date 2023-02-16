import { Role } from '../../common/enums/role.enum';

export class CreateUserRoleDto {
  userID: string;
  artistID: string;
  role: Role;
}
