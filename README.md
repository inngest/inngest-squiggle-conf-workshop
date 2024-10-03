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

## Directories

- `/worker` - The worker and handler code that
- `/durable-worker` - Where you'll make the worker durable!
- `/queue` - A simple queue
