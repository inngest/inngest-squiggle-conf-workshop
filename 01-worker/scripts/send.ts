import { QueueClient } from '../../lib/queue';
import { createId } from '../../lib/ids';

const queue = new QueueClient();

const item = {
  name: 'user.signup',
  data: {
    user: {
      id: createId(),
      name: 'Taylor Person',
      company: 'Acme, Inc.',
    },
    signupSurvey: {
      teamSize: '10-30',
      industry: 'Technology',
    },
  },
};

queue.enqueue(item);
