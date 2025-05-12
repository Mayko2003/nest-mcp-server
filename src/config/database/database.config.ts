import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { AppEnv } from '../env/env.interface';
import { DatabaseEntities } from './database.entities';
import { DATABASE_PROVIDER_NAME } from 'src/shared/constants/providers';

export const DatabaseConfig: TypeOrmModuleAsyncOptions = {
  name: DATABASE_PROVIDER_NAME,
  useFactory: (configService: ConfigService<AppEnv>) =>
    ({
      type: configService.get('DATABASE_TYPE'),
      host: configService.get('DATABASE_HOST'),
      port: configService.get('DATABASE_PORT'),
      username: configService.get('DATABASE_USER'),
      password: configService.get('DATABASE_PASSWORD'),
      database: configService.get('DATABASE_SCHEMA'),
      synchronize: false,
      entities: DatabaseEntities,
    }) as TypeOrmModuleOptions,
  inject: [ConfigService],
};
