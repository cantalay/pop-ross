import { Module } from '@nestjs/common';
import { UserRoleService } from './user-role.service';

@Module({
  providers: [UserRoleService],
})
export class UserRoleModule {}
