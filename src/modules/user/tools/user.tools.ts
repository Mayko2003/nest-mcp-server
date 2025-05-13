/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ToolCallback } from '@modelcontextprotocol/sdk/server/mcp';
import { UserService } from '../user.service';
import { MCPTool } from 'src/shared/interface/mcp-tool.interface';
import {
  checkIdSchema,
  createUserToolSchema,
  updateUserToolSchema,
} from './schemas.tools';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

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
        const { email, username, password, firstName, lastName } =
          params as CreateUserDto;
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
    validator: updateUserToolSchema,
    getTool: (userService: UserService) => {
      const fn = async (params: any) => {
        const { id, email, username, firstName, lastName } =
          params as UpdateUserDto & { id: string };
        const user = await userService.update(id, {
          email,
          username,
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
    validator: checkIdSchema,
    getTool: (userService: UserService) => {
      const fn = async (params: any) => {
        const { id } = params as { id: string };
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
    validator: checkIdSchema,
    getTool: (userService: UserService) => {
      const fn = async (params: any) => {
        const { id } = params as { id: string };
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
