import { McpServer, ToolCallback } from '@modelcontextprotocol/sdk/server/mcp';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class MCPService implements OnModuleInit {
  private MCPServer: McpServer;
  private logger = new Logger('MCP SERVER');
  private sseTransport: { [key: string]: SSEServerTransport } = {};

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
    if (validator) {
      this.MCPServer?.tool(name, validator, cb);
    } else {
      this.MCPServer?.tool(name, cb);
    }
  }

  getServer() {
    return this.MCPServer;
  }

  addSSETransport(id: string, transport: SSEServerTransport) {
    this.sseTransport[id] = transport;
  }

  getSSETransport(id: string) {
    return this.sseTransport[id];
  }

  removeSSETransport(id: string) {
    delete this.sseTransport[id];
  }
}
