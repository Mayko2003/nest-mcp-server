import { ToolCallback } from '@modelcontextprotocol/sdk/server/mcp';

export interface MCPTool {
  name: string;
  validator?: any;
  getTool: (...args: any[]) => ToolCallback;
}
