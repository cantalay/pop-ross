import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterRequestDto extends PartialType(CreateUserDto) {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
