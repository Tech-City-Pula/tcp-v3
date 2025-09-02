import path from 'node:path';
import { faker } from '@faker-js/faker';
import { config } from 'dotenv';
import { sql } from 'drizzle-orm';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { reset, seed } from 'drizzle-seed';
import { auth } from 'lib/auth/index.ts';
import { db } from 'lib/db/index.ts';
import { schema } from 'lib/db/schemas/index.ts';
import { eventAttendance, events, members, newsletterSubscriptions, talks } from 'lib/db/schemas/schema.public.ts';

config();

async function main() {
  // 1. Start with the current module's directory
  const currentDir = import.meta.dirname;

  // 2. Resolve the new path by going back two directories ('../..')
  //    and then into your target directory (e.g., 'assets')
  const targetPath = path.resolve(currentDir, '../../supabase/migrations');

  console.log(targetPath);

  const publicSchemasCountQuery = await db.execute<{ count: number }>(sql`
  SELECT COUNT(*)
  FROM information_schema.tables
  WHERE table_schema = 'public' AND table_type = 'BASE TABLE';  
  `);

  const [result] = publicSchemasCountQuery.rows;

  if (!result) {
    throw new Error('Failed getting schema count. No result rows returned');
  }

  if (result.count > 0) {
    await reset(db, schema);
    console.log('db reset complete');
  } else {
    console.log('skipped db reset');
  }

  // run migrations using the resolved migrations folder
  await migrate(db, { migrationsFolder: targetPath });
  console.log('schema migration complete');

  // first create admins
  await Promise.all([
    auth.api.createUser({
      body: {
        email: 'admin1@email.com',
        password: '12345678',
        name: 'Admin 1',
        role: 'admin',
      },
    }),
    auth.api.createUser({
      body: {
        email: 'admin2@email.com',
        password: '12345678',
        name: 'Admin 2',
        role: 'admin',
      },
    }),
    auth.api.createUser({
      body: {
        email: 'admin3@email.com',
        password: '12345678',
        name: 'Admin 3',
        role: 'admin',
      },
    }),
  ]);

  console.log('inserted 3 adminos');

  // create 100 reusable emails
  const emails = new Set(Array.from({ length: 100 }, () => faker.internet.email()));

  // don't seed the auth tables, only the public schema
  await seed(
    db,
    {
      talks,
      events,
      newsletterSubscriptions,
      members,
    },
    { count: 10 }
  ).refine((generators) => {
    return {
      talks: {
        columns: {
          title: generators.loremIpsum({
            sentencesCount: 1,
          }),
          description: generators.loremIpsum({
            sentencesCount: 5,
          }),
          email: generators.email(),
        },
      },
      events: {
        columns: {
          title: generators.loremIpsum({
            sentencesCount: 1,
          }),
          description: generators.loremIpsum({
            sentencesCount: 5,
          }),
          location: generators.valuesFromArray({
            values: ['Pula', 'Zagreb', 'Split'],
          }),
        },
        count: 30,
      },
      newsletterSubscriptions: {
        columns: {
          email: generators.valuesFromArray({
            values: Array.from(emails),
            isUnique: true,
          }),
        },
        count: 25,
      },
    };
  });

  // seed attendances with existing ids
  const eventIds = await db.select({ eventId: events.id }).from(events);
  await seed(
    db,
    {
      eventAttendance,
    },
    { count: 75 }
  ).refine((generators) => ({
    eventAttendance: {
      columns: {
        eventId: generators.valuesFromArray({
          values: eventIds.map(({ eventId }) => eventId),
        }),
        email: generators.valuesFromArray({
          values: Array.from(emails),
        }),
      },
    },
  }));

  console.log('seeding public schema done');

  process.exit(0);
}

if (import.meta.main) {
  main().catch(console.error);
}
