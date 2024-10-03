import { expensiveLLM, slowLLM } from '../lib/ai';

export async function handler({ event, step }) {
  console.log('event:', event);

  const result = await expensiveLLM(event.data.prompt);

  // const row = await db.insert(result);

  const emailBody = await slowLLM(event.data.prompt);

  // const user = await db.select(event.data.userId);
  // await emailAPI.send(user, emailBody);

  return 'true!!';

  // const emailBody = await anotherExpensiveCallToAI(result);

  // const user = await db.select(event.data.userId);
  // await emailAPI.send(user, emailBody);
}
