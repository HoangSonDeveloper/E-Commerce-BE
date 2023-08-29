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
import { NextFunction, Request, Response } from 'express';

async function bootstrap() {
  const app: NestExpressApplication =
    await NestFactory.create<NestExpressApplication>(
      AppModule,
      new ExpressAdapter(),
    );
  app.use(
    cors({
      origin: ['http://localhost:3000', 'https://learnbox.live'],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    }),
  );
  app.use(cookieParser());

  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', 'https://learnbox.live');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
  });

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      // @ts-ignore
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(validationErrors);
      },
    }),
  );
  await app.listen(5001);
}
bootstrap();
