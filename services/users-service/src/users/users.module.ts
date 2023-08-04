import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { User } from './models/users.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Role } from './models/roles.model';
import { UserRole } from './models/user-roles.model';

@Module({
  imports: [SequelizeModule.forFeature([User, UserRole, Role])],
  controllers: [UsersController],
  providers: [{ provide: 'UsersService', useClass: UsersService }],
})
export class UsersModule {}
