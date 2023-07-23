import { Sequelize } from 'sequelize-typescript';

import {
  SEQUELIZE,
  DEVELOPMENT,
  TEST,
  PRODUCTION,
} from '../common/common.interface';
import { databaseConfig } from './database.config';
import { User } from '../users/user.model';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
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
];
