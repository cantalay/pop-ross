import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { IsBoolean, IsEnum, IsStrongPassword } from 'class-validator';
import { Role } from '../../common/enums/role.enum';

export class RegisterRequestDto extends PartialType(CreateUserDto) {
  @IsStrongPassword()
  password: string;

  @IsEnum(Role)
  role: Role;

  @IsBoolean()
  asArtist: boolean;
}
