export async function handler({ event }) {
  console.log('event:', event);

  if (Math.random() > 0.5) {
    throw new Error('failure!!');
  }

  return 'true!!';
  // const result = await expensiveCallToAI(event.data.prompt);

  // const row = await db.insert(result);

  // const emailBody = await anotherExpensiveCallToAI(result);

  // const user = await db.select(event.data.userId);
  // await emailAPI.send(user, emailBody);
}
