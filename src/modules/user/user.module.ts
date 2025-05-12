import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntityDB } from './entities/database/user.entity';
import { DATABASE_PROVIDER_NAME } from 'src/shared/constants/providers';
import { UserRepository } from './repository/user.repository.impl';
import { UserMCPService } from './user-mcp.service';
import { McpModule } from '../mcp/mcp.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntityDB], DATABASE_PROVIDER_NAME),
    McpModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, UserMCPService],
  exports: [UserService],
})
export class UserModule {}
