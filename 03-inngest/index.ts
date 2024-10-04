import inngestFastify from 'inngest/fastify';
import Fastify from 'fastify';

import { inngest, userSignupFunction } from './inngest';

const PORT = 3000;

const server = Fastify({
  logger: false,
});

server.register(inngestFastify, {
  client: inngest,
  functions: [userSignupFunction],
  options: {},
});

server.listen({ port: PORT }, function (err, address) {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
