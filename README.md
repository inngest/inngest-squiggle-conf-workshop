# Inngest - Squiggle Conference 2024 Workshop

## Get started

```
git clone git@github.com:inngest/inngest-squiggle-conf-workshop.git
cd inngest-squiggle-conf-workshop
npm install
```

### Part 1 - Run the basic worker

Start the worker:

```
npm run start:worker
```

In another terminal session, send an event to trigger the worker:

```
npm run send
```

### Part 2 - Make it durable

When you're ready to make your worker "durable", run:

```
npm run start:worker
```

Continue to send events for testing

```
npm run send
```

### Part 3 - Try out a full implementation (Inngest)

Run the server with Inngest functions:

```
npm run start:inngest
```

Send events to Inngest

```
npm run send:inngest
```

## Directories

- `/01-worker` - The worker and handler code that
- `/02-durable-worker` - Where you'll make the worker durable!
- `/03-inngest` - The Inngest demo
- `/queue` - A simple queue, this is just to power the demo
