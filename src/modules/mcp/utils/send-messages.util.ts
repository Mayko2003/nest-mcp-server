import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse';

export const sendMessages = async (transport: SSEServerTransport) => {
  try {
    await transport.send({
      jsonrpc: '2.0',
      method: 'sse/connection',
      params: { message: 'Stream started' },
    });
    console.log('Stream started');

    let messageCount = 0;
    const fn = async () => {
      messageCount++;

      const message = `Message ${messageCount} at ${new Date().toISOString()}`;

      try {
        await transport.send({
          jsonrpc: '2.0',
          method: 'sse/message',
          params: { data: message },
        });

        console.log(`Sent: ${message}`);

        if (messageCount === 2) {
          clearInterval(interval);
          await transport.send({
            jsonrpc: '2.0',
            method: 'sse/complete',
            params: { message: 'Stream completed' },
          });
          console.log('Stream completed');
        }
      } catch (error) {
        console.error('Error sending message:', error);
        clearInterval(interval);
      }
    };
    const interval = setInterval(() => {
      fn()
        .then(() => {
          console.log('Message sent');
        })
        .catch((error) => {
          console.error('Error sending message:', error);
          clearInterval(interval);
        });
    }, 1000);
  } catch (error) {
    console.error('Error in startSending:', error);
  }
};
