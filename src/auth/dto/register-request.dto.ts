import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { IsBoolean, IsStrongPassword } from 'class-validator';

export class RegisterRequestDto extends PartialType(CreateUserDto) {
  @IsStrongPassword()
  password: string;

  @IsBoolean()
  asArtist: boolean;
}
