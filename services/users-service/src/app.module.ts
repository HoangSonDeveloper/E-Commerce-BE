import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { User } from './users/models/users.model';
import fs from 'fs';
import { UserRole } from './users/models/user-roles.model';
import { Role } from './users/models/roles.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService,
      ): Promise<SequelizeModuleOptions> => ({
        dialect: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        // typeValidation: true,
        // benchmark: true,
        // native: true,
        // autoLoadModels: true,
        dialectOptions: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
        synchronize: configService.get<boolean>('DB_SYNC'),
        models: [User, UserRole, Role],
        // define: {
        //   timestamps: true,
        //   underscored: false,
        //   version: false,
        //   // schema: configService.get<string>('DB_SCHEMA'),
        // },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
})
export class AppModule {}
