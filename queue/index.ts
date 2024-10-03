import Fastify from 'fastify';
import { Queue } from './queue';

const PORT = 4040;

const server = Fastify({
  logger: false,
});

const q = new Queue();

/**
 * curl -X POST http://localhost:4040/enqueue -H 'content-type: application/json' -d '{ "hello": "yeah" }'
 */
server.post('/enqueue', async function handler(request, reply) {
  q.enqueue(request.body);
  return { success: true, item: request.body };
});

/**
 * curl -X POST http://localhost:4040/dequeue
 */
server.post('/dequeue', async function handler(request, reply) {
  const item = q.dequeue();
  if (item) {
    return { success: true, item };
  }
  return { success: true, item: null };
});

/**
 * curl -X GET http://localhost:4040/peek
 */
server.get('/peek', async function handler(request, reply) {
  const item = q.peek();
  if (item) {
    return { success: true, item };
  }
  return { success: true, item: null };
});

/**
 * curl -X GET http://localhost:4040/size
 */
server.get('/size', async function handler(request, reply) {
  const size = q.size();
  return { success: true, size };
});

async function main() {
  // Seed the queue for testing
  // q.enqueue({ data: { userId: 'kknxn81024' } });
  // q.enqueue({ data: { userId: '09n39g8n82' } });
  // q.enqueue({ data: { userId: 'n031908h31' } });

  try {
    console.log(`Queue started on port ${PORT}`);
    await server.listen({ port: PORT });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

main();
