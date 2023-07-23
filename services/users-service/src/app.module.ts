import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { User } from './users/user.model';
import fs from 'fs';

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
            ca: fs.readFileSync(__dirname + '/config/ca.crt'),
          },
        },
        synchronize: configService.get<boolean>('DB_SYNC'),
        models: [User],
        define: {
          timestamps: true,
          underscored: false,
          version: false,
          // schema: configService.get<string>('DB_SCHEMA'),
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
})
export class AppModule {}
