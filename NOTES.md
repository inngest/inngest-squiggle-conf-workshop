# Building Resilient Applications with Durable Executions

Premise - queues are great, but they're simple.

- Why use queues and background work
- How it works at the basic level - add item, poll for items, execute code (doesn't include deleting messages, )

1. Initial function - list the problems of code - run it

```js
async function handler ({ event }) {

  const result = await expensiveCallToAI(event.data.prompt);

  const row = await db.insert(result);

  const emailBody = await anotherExpensiveCallToAI(result);

  const user = await db.select(event.data.userId);
  await emailAPI.send(user, emailBody)
}

function worker () {

  while (true)
    const data = queue.fetch('my-queue', 1)
    if (data) {
      try {
        await handler({ event: data })
      } catch (err) {
        // tbd
      }
    }
    await queue.delete('my-queue', data.id)

    await new Promise(res => setTimeout(res, 1000))
  }

}
```

2. Let's break it up

- Option A: different queues for each step - it's ugly, lotta infra
- Option B: save work incrementally and re-insert into queue on failure

How do we do that? Memoization!

```js
await function handler ({ event, step }) {

  const result = await step('', () => {
    return await expensiveCallToAI(event.data.prompt);
  })

  // etc...
}

function worker () {

  const stepData = {}; // would be a db

  while (true)

    const data = queue.fetch('my-queue', 1)
    if (data) {

      await function step(id, callback) {
        // the workshop person writes this code:
        if (stepData[id]) {
          return stepData[id]
        }
        const result = await callback();
        stepData[id] = result;
        return result;
      }

      try {
        await handler({ event: data })
      } catch (err) {
        // tbd
      }
    }
    await queue.delete('my-queue', data.id)

    await new Promise(res => setTimeout(res, 1000))
  }

}
```

3.
