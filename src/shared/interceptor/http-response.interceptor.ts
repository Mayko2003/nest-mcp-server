import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Request, Response } from 'express';
import { map, Observable } from 'rxjs';
import { HttpResponse } from '../interface/http-response.interface';

export class ResponseBodyInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    // exclude mcp routes
    if (request.url.includes('/mcp')) {
      return handler.handle();
    }
    console.log('interceptor', request.body);
    return handler.handle().pipe(
      map(
        (data) =>
          ({
            statusCode: response.statusCode,
            message: 'success',
            metadata: {
              timestamp: Date.now(),
              version: 'v1',
              path: request.url,
            },
            data,
            ok: true,
          }) as HttpResponse<any>,
      ),
    );
  }
}
