import { Injectable, OnModuleInit } from '@nestjs/common';
import { MCPService } from '../mcp/mcp.service';
import { UserService } from './user.service';
import { UserMCPTools } from './tools/user.tools';
@Injectable()
export class UserMCPService implements OnModuleInit {
  constructor(
    private readonly mcpService: MCPService,
    private readonly userService: UserService,
  ) {}

  onModuleInit() {
    for (const tool of UserMCPTools) {
      this.mcpService.addTool(
        tool.name,
        tool.getTool(this.userService),
        tool.validator,
      );
    }
  }
}
