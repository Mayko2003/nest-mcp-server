import { McpServer, ToolCallback } from '@modelcontextprotocol/sdk/server/mcp';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class MCPService implements OnModuleInit {
  private MCPServer: McpServer;
  private logger = new Logger('MCP SERVER');

  onModuleInit() {
    this.MCPServer = new McpServer({
      name: 'Users API MCP Server',
      version: '1.0.0',
    });

    // Configurar herramientas básicas
    this.MCPServer.tool('ping', () => {
      return {
        content: [
          {
            type: 'text',
            text: 'pong',
          },
        ],
      };
    });

    this.logger.log('MCP Server initialized!');
  }

  addTool(name: string, cb: ToolCallback, validator?: any) {
    this.MCPServer?.tool(name, validator || null, cb);
  }

  getServer() {
    return this.MCPServer;
  }
}
