import { auth } from '../auth/index.ts';

export async function createAdminUser(props: { email: string; password: string; name: string }) {
  await auth.api.createUser({
    body: {
      ...props,
      role: 'admin',
    },
  });
}
