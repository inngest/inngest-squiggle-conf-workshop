import ai from '../lib/ai';
import crm from '../lib/crm';
import { template, emailAPI } from '../lib/email';

export async function handler({ event }) {
  const { user, signupSurvey } = event.data;

  const personalizedMessage = await ai.slowLLM(user, signupSurvey);

  const emailBody = await template.compile(
    'welcome_email',
    personalizedMessage
  );

  await emailAPI.send(user, emailBody);

  await crm.addCustomer(user);
}
