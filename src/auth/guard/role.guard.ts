import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../common/enums/role.enum';
import { ROLES_KEY } from '../decorators/roles.decoorator';
import { UserRoleService } from '../../user-role/user-role.service';
import { UserRole } from '../../user-role/entities/user-role.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userRoleService: UserRoleService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (requiredRoles) {
      const { user } = context.switchToHttp().getRequest();
      const userRole: UserRole = await this.userRoleService.findOneByUserID(
        user.userID,
      );
      if (userRole) {
        return requiredRoles.includes(userRole.role);
      }
    }
    return false;
  }
}
