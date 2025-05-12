import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AppEnvSchema } from './config/env/env.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './config/database/database.config';
import { McpModule } from './modules/mcp/mcp.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: AppEnvSchema,
      cache: true,
    }),
    TypeOrmModule.forRootAsync(DatabaseConfig),
    UserModule,
    McpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
