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
    try {
      const server = this.mcpService.getServer();
      const transport: StreamableHTTPServerTransport =
        new StreamableHTTPServerTransport({
          sessionIdGenerator: undefined,
        });
      res.on('close', () => {
        this.logger.log('Request closed, closing server...');
        transport.close();
        server.close();
      });
      await server.connect(transport);
      await transport.handleRequest(req, res, req.body);
    } catch (error) {
      this.logger.error(error);
      if (!res.headersSent) {
        res.status(500).json({
          jsonrpc: '2.0',
          error: {
            code: -32603,
            message: 'Internal server error',
          },
          id: null,
        });
      }
    }
  }
}
