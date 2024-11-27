import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { UserSignUpDto } from './dto/user-sign-up';
import { UserSignInResponseDto } from './dto/user-sign-in-response';
import { UserSignUpResponseDto } from './dto/user-sign-up-response';
import { Auth } from 'src/decorators/auth';
import { Login } from 'src/decorators/login';
import { UserSignInDto } from './dto/user-sign-in';

@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Login()
  @Post('auth/login')
  login(@Body() data: UserSignInDto): Promise<UserSignInResponseDto> {
    return this.authService.login(data);
  }

  @Auth()
  @Post('auth/logout')
  logout(@Req() request: Request, @Res() response: Response): Promise<any> {
    return this.authService.logout(request, response);
  }

  @Post('client/register')
  register(@Body() data: UserSignUpDto): Promise<UserSignUpResponseDto> {
    return this.authService.register(data);
  }
}
