import { ToolCallback } from '@modelcontextprotocol/sdk/server/mcp';

export interface MCPTool {
  name: string;
  getTool: (...args: any[]) => ToolCallback;
}
