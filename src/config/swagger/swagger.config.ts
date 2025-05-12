import { DocumentBuilder } from '@nestjs/swagger';

export const SWAGGER_CONFIG = new DocumentBuilder()
  .setTitle('NestJS API MCP Server')
  .setDescription('NestJS API for MCP Server')
  .setVersion('1.0')
  .build();
