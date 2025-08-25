import { auth } from '@repo/backend/auth';
import { createServerFn } from '@tanstack/react-start';
import { getWebRequest } from '@tanstack/react-start/server';

export const getInitialSession = createServerFn({ method: 'GET' }).handler(async () => {
  const request = getWebRequest();

  const session = await auth.api.getSession(request);

  if (!session) {
    return {
      session: undefined,
      user: undefined,
    } as const;
  }

  return {
    session: session.session,
    user: session.user,
  } as const;
});
