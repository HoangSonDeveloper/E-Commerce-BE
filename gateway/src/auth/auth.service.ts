import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserInput, User } from '../common/common.interface';
import { SignupUserInput } from '../common/common.interface';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { IUsersService } from '../users/users.interface';
import { PasswordUtils } from '../utils/password.utils';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @Inject('UsersServiceClient')
    private readonly usersServiceClient: ClientGrpcProxy,
    private readonly passwordUtils: PasswordUtils,
    private readonly jwtService: JwtService,
  ) {}

  private usersService: IUsersService;

  onModuleInit(): void {
    this.usersService =
      this.usersServiceClient.getService<IUsersService>('UsersService');
  }

  async register(data: SignupUserInput): Promise<any> {
    const { count } = await this.usersService
      .count({
        where: JSON.stringify({ email: data.email }),
      })
      .toPromise();

    if (count >= 1) throw new Error('Email taken');

    const user: User = await this.usersService
      .create({
        ...data,
        password: await this.passwordUtils.hash(data.password),
      })
      .toPromise();

    return user;
  }

  async login(data: LoginUserInput): Promise<any> {
    const user: any = await this.usersService
      .findOne({
        where: JSON.stringify({ email: data.email }),
      })
      .toPromise();
    if (!user) throw new Error('Unable to login');

    const isMatch = await this.passwordUtils.compare(
      data.password,
      user.password,
    );

    if (!isMatch) throw new Error('Unable to login');

    return user;
  }

  async validateUser(data: LoginUserInput): Promise<boolean> {
    const user: any = await this.usersService
      .findOne({
        where: JSON.stringify({ email: data.email }),
      })
      .toPromise();

    if (!user) throw new Error('Oh noo');

    const isMatch = await this.passwordUtils.compare(
      data.password,
      user.password,
    );

    if (!isMatch) throw new Error('alahu akbar');

    return true;
  }

  async generateToken(user: User): Promise<any> {
    const payload = {
      sub: user['_id'],
      email: user.email,
    };

    return await this.jwtService.signAsync(payload);
  }
}
