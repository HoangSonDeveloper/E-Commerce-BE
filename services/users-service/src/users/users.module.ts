import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { User } from './user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  // imports: [DatabaseModule],
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    { provide: 'UsersService', useClass: UsersService },
    {
      provide: 'UsersRepository',
      useValue: User,
    },
  ],
})
export class UsersModule {}
