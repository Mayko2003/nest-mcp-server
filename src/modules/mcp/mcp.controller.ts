import { Controller, Logger, Post, Req, Res } from '@nestjs/common';
import { MCPService } from './mcp.service';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp';
import { Request, Response } from 'express';

@Controller('mcp')
export class MCPController {
  private logger = new Logger('MCP Controller');
  constructor(private readonly mcpService: MCPService) {}

  @Post('/')
  async postController(@Req() req: Request, @Res() res: Response) {
    console.log('New request');
    console.log('MCP Request', req.body);
    try {
      const server = this.mcpService.getServer();
      const transport: StreamableHTTPServerTransport =
        new StreamableHTTPServerTransport({
          sessionIdGenerator: undefined,
        });
      const closeConnection = async () => {
        await transport.close();
        await server.close();
        this.logger.log('Server & transport closed');
      };
      res.on('close', () => {
        this.logger.log('Request closed, closing server...');
        closeConnection();
      });
      await server.connect(transport);
      await transport.handleRequest(req, res, req.body);
    } catch (error) {
      this.logger.error(error);
      const { message } = error as Error;
      const errorMessage = message || 'Internal server error';
      if (!res.headersSent) {
        res.status(500).json({
          jsonrpc: '2.0',
          error: {
            code: -32603,
            message: errorMessage,
          },
          id: null,
        });
      }
    }
  }
}
