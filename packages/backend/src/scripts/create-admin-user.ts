import 'dotenv/config';

import { auth } from '../lib/auth/index.ts';

async function main() {
  await auth.api.createUser({
    body: {
      role: 'admin',
      email: 'admin@matej.com',
      password: 'strongopasso',
      name: 'tejma',
      data: {
        hello: 'world',
      },
    },
  });
}

main().catch(console.error);
