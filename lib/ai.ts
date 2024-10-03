import { delay } from './timing';
import { randomFailure } from './chaos';
import { logger } from './logger';

async function slowLLM(x: any, y: any) {
  // fake our slow response from 500-1000ms
  await delay(500, 1000);
  randomFailure(0.3, 'AI API: 429 Rate limit exceeded');
  logger.debug('AI personalized message created');
  return { chat: 'Here is a smart AI response' };
}

export default {
  slowLLM,
};
