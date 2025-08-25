import { adminClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

const baseURL = 'http://localhost:3001';

export const authClient = createAuthClient({ baseURL, plugins: [adminClient()] });
