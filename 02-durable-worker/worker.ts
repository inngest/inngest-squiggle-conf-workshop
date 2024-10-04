import { QueueClient } from '../lib/queue';
import { logger } from '../lib/logger';
import { handler } from './handler';

const POLL_INTERVAL = 1_000; // ms

const queue = new QueueClient();

export async function worker() {
  /*
   * HINT: Memoized state should exist outside of the loop
   */

  while (true) {
    const event = await queue.dequeue().catch((err) => {
      logger.error(`Failed to fetch from queue: ${err}`);
      return null;
    });

    if (event) {
      logger.info(`Processing queue item:`, event.id);

      // ⬇️ Start here!
      function step(id, callback) {
        // Your code will go here!
        return callback();
      }

      try {
        await handler({ event, step });
        logger.info('✅ Success!');
      } catch (err) {
        logger.error(`Processing failed: ${err}`);
        // re-queue failed work
        await queue.enqueue(event);
      }
    } else {
      logger.info('No queue items available');
    }

    await new Promise((res) => setTimeout(res, POLL_INTERVAL));
  }
}
