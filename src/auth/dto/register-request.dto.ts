import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { IsEnum, IsStrongPassword } from 'class-validator';
import { Role } from '../../common/enums/role.enum';

export class RegisterRequestDto extends PartialType(CreateUserDto) {
  @IsStrongPassword()
  password: string;

  @IsEnum(Role)
  role: Role;
}
