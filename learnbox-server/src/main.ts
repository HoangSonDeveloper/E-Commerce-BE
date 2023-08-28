import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './middlewares/error-handler.provider';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'sequelize';

async function bootstrap() {
  const app: NestExpressApplication =
    await NestFactory.create<NestExpressApplication>(
      AppModule,
      new ExpressAdapter(),
    );
  app.use(cors());
  app.use(cookieParser());

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      // @ts-ignore
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(validationErrors);
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
