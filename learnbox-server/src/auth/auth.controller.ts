import { LoginDto, RegisterDto } from './auth.dto';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() body: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    try {
      const { user, role } = await this.authService.register(body);

      res.cookie('x-auth-token', await this.authService.generateToken(user), {
        httpOnly: true,
        maxAge: 1.8e6,
      });

      return {
        result: {
          user,
          role,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  @Post('login')
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    try {
      const { user, role } = await this.authService.login(body);

      res.cookie('x-auth-token', await this.authService.generateToken(user), {
        httpOnly: true,
        maxAge: 1.8e6,
      });

      return {
        result: {
          user,
          role,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response): Promise<any> {
    res.clearCookie('x-auth-token');
    return 'OK';
  }
}
