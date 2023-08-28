import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordUtils } from '../utils/password.utils';
import { lastValueFrom } from 'rxjs';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/models/users.model';
import { ROLES } from '../common/common.interface';
import { Role } from '../users/models/roles.model';
import { UserRole } from '../users/models/user-roles.model';
import { Sequelize } from 'sequelize-typescript';
import { raw } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userRepo: typeof User,
    @InjectModel(Role) private readonly roleRepo: typeof Role,
    @InjectModel(UserRole) private readonly userRoleRepo: typeof UserRole,
    private readonly sequelize: Sequelize,
    private readonly passwordUtils: PasswordUtils,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: any): Promise<any> {
    try {
      const count = await this.userRepo.count({
        where: { email: data.email },
      });

      if (count > 0) throw new BadRequestException('Email already exists');

      let user: any = await this.userRepo.create({
        ...data,
        password: await this.passwordUtils.hash(data.password),
        avatar: process.env.DEFAULT_USER_IMAGE,
      });

      await this.userRoleRepo.create({
        user_id: user['id'],
        role_id: ROLES.STUDENT,
      });

      const role = await this.roleRepo.findByPk(ROLES.STUDENT, {
        raw: true,
      });

      delete user.password;

      return {
        user,
        role,
      };
    } catch (error) {
      throw error;
    }
  }

  async login(data: any): Promise<any> {
    const user: any = await this.userRepo.findOne({
      where: { email: data.email },
      raw: true,
    });

    if (!user.email)
      throw new UnauthorizedException('Username or password is invalid');

    const isMatch = await this.passwordUtils.compare(
      data.password,
      user.password,
    );

    if (!isMatch)
      throw new UnauthorizedException('Username or password is invalid');

    const role = await this.roleRepo.findByPk(ROLES.STUDENT, {
      raw: true,
    });

    delete user.password;

    return {
      user,
      role,
    };
  }

  async generateToken(user: User): Promise<any> {
    const payload = {
      sub: user.id,
      email: user.email,
    };

    return await this.jwtService.signAsync(payload, { expiresIn: '60d' });
  }
}
