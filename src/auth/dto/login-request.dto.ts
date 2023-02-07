import { IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestDto {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
