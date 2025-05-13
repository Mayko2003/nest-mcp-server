import { Controller, Get, Logger, Post, Req, Res } from '@nestjs/common';
import { MCPService } from './mcp.service';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse';
import { Request, Response } from 'express';

@Controller('mcp')
export class MCPController {
  private logger = new Logger('MCP Controller');
  constructor(private readonly mcpService: MCPService) {}

  // STEAMABLE HTTP CONTROLLER IMPLEMENTATION
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

  // SSE CONTROLLER IMPLEMENTATION
  @Get('/sse')
  async connectSSE(@Req() req: Request, @Res() res: Response) {
    const transport = new SSEServerTransport('/api/mcp/sse/message', res);
    console.log('new transport created with session id: ', transport.sessionId);
    this.mcpService.addSSETransport(transport.sessionId, transport);
    const server = this.mcpService.getServer();
    res.on('close', () => {
      this.logger.log('Request closed, closing server...');
      this.mcpService.removeSSETransport(transport.sessionId);
    });

    await server.connect(transport);

    // an exmaple of a server-sent-event (message) to client
    //await sendMessages(transport);
  }
  @Post('/sse/message')
  async postSSE(@Req() req: Request, @Res() res: Response) {
    const sessionId = req.query.sessionId as string;
    const transport = this.mcpService.getSSETransport(sessionId);
    if (!transport) {
      return res
        .status(400)
        .send({ messages: 'No transport found for sessionId.' });
    }
    await transport.handlePostMessage(req, res, req.body);
  }
}
