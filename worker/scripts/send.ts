import { QueueClient } from '../../lib/queue';

const queue = new QueueClient();

const item = {
  name: 'generate.result',
  data: {
    userId: '2mstIkLYYnIJLXGnbV8glHtHWp5',
    prompt: `You are an AI assistant. Please help with...`,
  },
};

queue.enqueue(item);
