import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { RegisterRequestDto } from './dto/register-request.dto';
import { Public } from './decorators/public.decorator';
import { LoginResponseDto } from './dto/login-response.dto';

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
}
