import { IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../user/entities/user.entity';

export class LoginResponseDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsString()
  fullName: string;
}
