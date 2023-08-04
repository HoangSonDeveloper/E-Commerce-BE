import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { SignupUserInput } from '../common/common.interface';
import { AuthService } from '../auth/auth.service';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() body: SignupUserInput,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    try {
      const user = await this.authService.register(body);

      res.cookie('x-auth-token', await this.authService.generateToken(user), {
        httpOnly: true,
        maxAge: 1.8e6,
      });

      return user;
    } catch (error) {
      return error.message;
    }
  }
  @Post('login')
  async login(
    @Body() body: SignupUserInput,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    const user = await this.authService.login(body);
    delete user.password;

    res.cookie('x-auth-token', await this.authService.generateToken(user), {
      httpOnly: true,
      maxAge: 1.8e6,
    });

    return user;
  }
}
