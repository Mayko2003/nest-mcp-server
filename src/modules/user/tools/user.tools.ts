/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ToolCallback } from '@modelcontextprotocol/sdk/server/mcp';
import { UserService } from '../user.service';
import { MCPTool } from 'src/shared/interface/mcp-tool.interface';
import { createUserToolSchema } from './schemas.tools';

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
  {
    name: 'createUserTool',
    validator: createUserToolSchema,
    getTool: (userService: UserService) => {
      const fn = async (params: any) => {
        const { email, username, password, firstName, lastName } = params;
        const user = await userService.create({
          email,
          username,
          password,
          firstName,
          lastName,
        });
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(user),
            },
          ],
        };
      };
      return fn as ToolCallback;
    },
  },
  {
    name: 'updateUserTool',
    getTool: (userService: UserService) => {
      const fn = async (params: any) => {
        const { id, email, username, password, firstName, lastName } = params;
        const user = await userService.update(id, {
          email,
          username,
          password,
          firstName,
          lastName,
        });
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(user),
            },
          ],
        };
      };
      return fn as ToolCallback;
    },
  },
  {
    name: 'deleteUserTool',
    getTool: (userService: UserService) => {
      const fn = async (params: any) => {
        const { id } = params;
        const user = await userService.remove(id);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(user),
            },
          ],
        };
      };
      return fn as ToolCallback;
    },
  },
  {
    name: 'getUserTool',
    getTool: (userService: UserService) => {
      const fn = async (params: any) => {
        const { id } = params;
        const user = await userService.findOne(id);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(user),
            },
          ],
        };
      };
      return fn as ToolCallback;
    },
  },
];
