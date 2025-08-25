import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin } from 'better-auth/plugins';
import { db } from '../db/index.ts'; // your drizzle instance
import { schema } from '../db/schemas/index.ts';

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  plugins: [admin()],
  database: drizzleAdapter(db, {
    provider: 'pg', // or "mysql", "sqlite"
    schema,
  }),
});
