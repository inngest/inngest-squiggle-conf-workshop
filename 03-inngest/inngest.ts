import { Inngest } from 'inngest';

import ai from '../lib/ai';
import crm from '../lib/crm';
import { template, emailAPI } from '../lib/email';

/*
 * Inngest code ⬇️
 */
export const inngest = new Inngest({ id: 'my-app' });

export const userSignupFunction = inngest.createFunction(
  { id: 'user-signup' },
  { event: 'user.signup' },
  async ({ event, step }) => {
    const { user, signupSurvey } = event.data;

    const personalizedMessage = await step.run('generate-msg', async () => {
      return await ai.slowLLM(user, signupSurvey);
    });

    await step.run('send-email', async () => {
      const emailBody = await template.compile(
        'welcome_email',
        personalizedMessage
      );

      return await emailAPI.send(user, emailBody);
    });

    await step.run('add-to-crm', async () => {
      return await crm.addCustomer(user);
    });

    /* New! */
    await step.sleep('wait-a-few-days', '1 minute'); // would be ~1 week in real life

    await step.run('send-trial-ended-email', async () => {
      const emailBody = await template.compile(
        'trial_ended',
        `Your trial has ended, please upgrade!`
      );

      return await emailAPI.send(user, emailBody);
    });
  }
);
