import { delay } from './timing';
import { randomFailure } from './chaos';

export async function slowLLM(x: any) {
  // fake our slow response from 500-1000ms
  await delay(500, 1000);
  return { chat: 'Here is a smart AI response' };
}

export async function expensiveLLM(x: any) {
  // fake our slow response from 200-400ms
  randomFailure();
  await delay(200, 400);
  return { chat: 'Here is a smart AI response' };
}
