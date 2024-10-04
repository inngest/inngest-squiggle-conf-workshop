import { inngest } from '../03-inngest/inngest';
import { createId } from '../lib/ids';

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

async function main() {
  await inngest.send(item);
}

main();
