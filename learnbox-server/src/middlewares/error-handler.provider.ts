import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    const status = exception.getStatus();
    const message = exception.getResponse() as string | { message: string };

    response.status(status).json({
      statusCode: status,
      message: typeof message === 'string' ? message : message.message,
    });
  }
}
