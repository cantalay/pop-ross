import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterRequestDto extends PartialType(CreateUserDto) {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  password: string;
}
