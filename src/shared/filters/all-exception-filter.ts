import {
  ArgumentsHost,
  BadRequestException,
  ExceptionFilter,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Catch } from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpResponseError } from '../interface/http-response.interface';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private logger = new Logger('AllExceptionFilter');

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    let statusCode = 500;
    let message = 'Internal Server Error';
    let error: string | string[] = 'Internal Server Error';
    if (exception instanceof BadRequestException) {
      statusCode = exception.getStatus();
      message = 'Bad Request';
      const errorData = exception.getResponse() as {
        message: string | string[];
        error: string;
        statusCode: number;
      };
      error = errorData.message || exception.message;
    } else if (exception instanceof NotFoundException) {
      statusCode = exception.getStatus();
      message = 'Not Found';
      error = exception.message;
    } else if (exception instanceof Error) {
      statusCode = 500;
      message = 'Internal Server Error';
      error = exception.message;
    } else {
      statusCode = 500;
      message = 'Internal Server Error';
      error = 'Internal Server Error';
    }

    const res: HttpResponseError = {
      statusCode,
      message,
      error,
      metadata: {
        timestamp: Date.now(),
        path: request.originalUrl,
        version: '1.0.0',
      },
      ok: false,
    };
    return response.status(400).send(res);
  }
}
