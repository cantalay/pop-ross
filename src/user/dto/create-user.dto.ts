import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsPhone } from '../validators/phone.validation';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  userName: string;
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @IsPhone()
  phone: string;

  @IsString()
  @MaxLength(200)
  @IsOptional()
  bio: string;
}
