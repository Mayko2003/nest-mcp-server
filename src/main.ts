import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_CONFIG } from './config/swagger/swagger.config';
import { ConfigService } from '@nestjs/config';
import { AppEnv } from './config/env/env.interface';
import { apiReference } from '@scalar/nestjs-api-reference';
import { ResponseBodyInterceptor } from './shared/interceptor/http-response.interceptor';
import { AllExceptionFilter } from './shared/filters/all-exception-filter';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    forceCloseConnections: true,
    snapshot: true,
  });

  // Global Config
  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new ResponseBodyInterceptor());
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // providers
  const configService: ConfigService<AppEnv> = app.get(ConfigService);
  const logger = new Logger('SERVER INFO');

  // Swagger
  const document = SwaggerModule.createDocument(app, SWAGGER_CONFIG);

  app.use(
    '/api/reference',
    apiReference({
      content: document,
      theme: 'moon',
      tagsSorter: 'alpha',
      operationsSorter: 'method',
    }),
  );

  // Start Server
  const port = +configService.get('PORT') || 3000;
  await app.listen(port);
  logger.log(`Server is running on port ${port}`);
}
void bootstrap();
