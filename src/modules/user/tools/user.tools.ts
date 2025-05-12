import { ToolCallback } from '@modelcontextprotocol/sdk/server/mcp';
import { UserService } from '../user.service';
import { MCPTool } from 'src/shared/interface/mcp-tool.interface';

export const UserMCPTools: MCPTool[] = [
  {
    name: 'getUsersTool',
    getTool: (userService: UserService) => {
      const fn = async () => {
        const users = await userService.findAll();
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(users),
            },
          ],
        };
      };
      return fn as ToolCallback;
    },
  },
];
