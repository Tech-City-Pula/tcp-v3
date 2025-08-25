import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin } from 'better-auth/plugins';
import { reactStartCookies } from 'better-auth/react-start';
import { db } from '../db/index.ts'; // your drizzle instance

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    admin(),
    // make sure `reactStartCookies` is the last plugin in the array
    reactStartCookies(),
  ],
  database: drizzleAdapter(db, {
    provider: 'pg', // or "mysql", "sqlite"
  }),
});
