import { QueueClient } from './queue';
import { handler } from './handler';

const POLL_INTERVAL = 1000; // ms

const queue = new QueueClient();

export async function worker() {
  while (true) {
    const item = await queue.dequeue().catch((err) => {
      console.log(`ERROR: Failed to fetch from queue: ${err}`);
      return null;
    });

    if (item) {
      console.log(`INFO: Processing queue item`, item);
      try {
        await handler({ event: item });
      } catch (err) {
        console.log(`ERROR: Processing failed: ${err}`);
        // re-queue failed work
        await queue.enqueue(item);
      }
    } else {
      console.log('INFO: No queue items available');
    }

    await new Promise((res) => setTimeout(res, POLL_INTERVAL));
  }
}
