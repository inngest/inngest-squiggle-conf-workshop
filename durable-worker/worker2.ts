import { QueueClient } from '../lib/queue';
import { handler } from '../worker/handler';

import { store } from '../lib/store';

const POLL_INTERVAL = 1_000; // ms

const queue = new QueueClient();

export async function worker() {
  while (true) {
    const event = await queue.dequeue().catch((err) => {
      console.log(`ERROR: Failed to fetch from queue: ${err}`);
      return null;
    });

    if (event) {
      console.log(`INFO: Processing queue item`, event.id);
      try {
        await handler({ event });
      } catch (err) {
        console.log(`ERROR: Processing failed: ${err}`);
        // re-queue failed work
        await queue.enqueue(event);
      }
    } else {
      console.log('INFO: No queue items available');
    }

    await new Promise((res) => setTimeout(res, POLL_INTERVAL));
  }
}
