# Inngest - Squiggle Conference 2024 Workshop

## Get started

```
git clone git@github.com:inngest/inngest-squiggle-conf-workshop.git
cd inngest-squiggle-conf-workshop
npm install
```

Start the worker:

```
npm run start:worker
```

In another terminal session, send an event to trigger the worker:

```
npm run send
```

When you're ready to make your worker "durable", run:

```
npm run start:worker
```

## Directories

- `/01-worker` - The worker and handler code that
- `/02-durable-worker` - Where you'll make the worker durable!
- `/queue` - A simple queue, this is just to power the demo
