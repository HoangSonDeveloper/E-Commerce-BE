import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { User } from '../users/user.model';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'SEQUELIZE',
      useFactory: async (configService: ConfigService) => {
        const sequelize = new Sequelize({
          dialect: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
        });
        sequelize.addModels([User]);
        console.log(sequelize);
        // await sequelize.sync();
        return sequelize;
      },
    },
  ],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
