import ai from '../lib/ai';
import crm from '../lib/crm';
import { template, emailAPI } from '../lib/email';

export async function handler({ event, step /* NEW! */ }) {
  const { user, signupSurvey } = event.data;

  const personalizedMessage = await step('generate-msg', async () => {
    return await ai.slowLLM(user, signupSurvey);
  });

  await step('send-email', async () => {
    const emailBody = await template.compile(
      'welcome_email',
      personalizedMessage
    );

    await emailAPI.send(user, emailBody);
  });

  await step('add-to-crm', async () => {
    await crm.addCustomer(user);
  });
}
