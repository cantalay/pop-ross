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
  setAsEditor(@Param('id') id: string, @Req() request) {
    return this.authService.setPermission(Role.Editor, id, request.user.userID);
  }

  @Post('/set-moderator/:id')
  setAsModerator(@Param('id') id: string, @Req() request) {
    return this.authService.setPermission(
      Role.Moderator,
      id,
      request.user.userID,
    );
  }
}
