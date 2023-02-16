import {
  Body,
  Controller,
  Param,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { RegisterRequestDto } from './dto/register-request.dto';
import { Public } from './decorators/public.decorator';
import { LoginResponseDto } from './dto/login-response.dto';
import { Role } from '../common/enums/role.enum';
import { Roles } from './decorators/roles.decoorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @Public()
  async login(@Request() req): Promise<LoginResponseDto> {
    const loginResponseDto: LoginResponseDto = new LoginResponseDto();
    loginResponseDto.userName = req.user.userName;
    loginResponseDto.fullName = req.user.fullName;
    loginResponseDto.token = await this.authService.login(req.user);
    return loginResponseDto;
  }

  @Post('register')
  @Public()
  async register(@Body() registerRequestDto: RegisterRequestDto) {
    return this.authService.register(registerRequestDto);
  }

  @Post('/set-editor/:id')
  @Roles(Role.Admin)
  setAsEditor(@Param('id') id: string, @Req() request) {
    const { user } = request;
    return this.authService.setPermission(Role.Editor, id, user.userID);
  }

  @Post('/set-moderator/:id')
  @Roles(Role.Admin, Role.Editor)
  setAsModerator(@Param('id') id: string, @Req() request) {
    const { user } = request;
    return this.authService.setPermission(Role.Moderator, id, user.userID);
  }
}
