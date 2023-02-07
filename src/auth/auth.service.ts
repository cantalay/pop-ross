import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterRequestDto } from './dto/register-request.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.password === password) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      userName: user.userName,
      id: user._id,
      fullName: user.fullName,
    };
    return this.jwtService.sign(payload);
  }

  register(registerRequestDto: RegisterRequestDto) {
    return this.userService.create(registerRequestDto as CreateUserDto);
  }
}
