import { QueueClient } from '../lib/queue';
import { logger } from '../lib/logger';
import { handler } from './handler';

const POLL_INTERVAL = 1_000; // ms

const queue = new QueueClient();

export async function worker() {
  /*
   * Memoized state should exist outside of the loop
   */
  const state = {};

  while (true) {
    const event = await queue.dequeue().catch((err) => {
      logger.error(`Failed to fetch from queue: ${err}`);
      return null;
    });

    if (event) {
      logger.info(`Processing queue item:`, event.id);

      // A finished function
      function step(id, callback) {
        // Check if the step has been run before for this unique event.id
        // If so, return the value immediately
        if (state[`${event.id}.${id}`]) {
          return state[`${event.id}.${id}`];
        }
        // If not, run the callback function and save the output in the state
        const output = callback();
        state[`${event.id}.${id}`] = output;
        // Return the output to continue the function
        return output;
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
