import { delay } from './timing';
import { randomFailure } from './chaos';
import { logger } from './logger';

async function addCustomer(x: any) {
  await delay(200, 400);
  randomFailure(0.4, 'CRM API: 500 Internal Server Error');
  logger.debug('Created user in CRM');
  return { message: 'Created new user in CRM!' };
}

export default {
  addCustomer,
};
