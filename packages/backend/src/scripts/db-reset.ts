import fs from 'node:fs/promises';
import path from 'node:path';
import { faker } from '@faker-js/faker';
import { config } from 'dotenv';
import { sql } from 'drizzle-orm';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { reset, seed } from 'drizzle-seed';
import { auth } from 'lib/auth/index.ts';
import { db } from 'lib/db/index.ts';
import { schema } from 'lib/db/schemas/index.ts';
import {
  blogs,
  eventAttendance,
  events,
  members,
  newsletterSubscriptions,
  talks,
} from 'lib/db/schemas/schema.public.ts';

config();

// hoisted regexes to satisfy linter
const MD_EXT_RE = /\.md$/;
const UNDERSCORE_RE = /_/g;
// regexes for markdown sanitization (hoisted for linter/perf)
const PRE_BLOCK_RE = /<pre[^>]*>([\s\S]*?)<\/pre>/i;
const TRIM_NEWLINES_RE = /^[\r\n]+|[\r\n]+$/g;

// magic numbers extracted as constants
const TARGET_PER_KIND = 150;
const EVENT_DAYS_RANGE = 90; // days before/after today
const PAST_FUTURE_SPLIT = 0.5; // probability of past vs future
const EVENT_HOUR = 18;
const EVENT_MINUTE = 0;
const EVENT_SECOND = 0;
const EVENT_MS = 0;

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

  // load markdown files and split 50/50 between blogs and events
  const mdDir = path.resolve(currentDir, './mock-markdown');
  const allMdFiles = (await fs.readdir(mdDir)).filter((f) => f.endsWith('.md'));

  // shuffle helper
  function shuffle<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const ai = arr[i];
      const aj = arr[j];
      if (ai === undefined || aj === undefined) {
        continue;
      }
      arr[i] = aj;
      arr[j] = ai;
    }
    return arr;
  }

  shuffle(allMdFiles);

  // determine counts (target 150 each). If fewer files available, adjust down but keep 50/50 split.
  const targetEach = TARGET_PER_KIND;
  const availableEach = Math.floor(allMdFiles.length / 2);
  const finalEach = Math.min(targetEach, availableEach);

  if (finalEach < targetEach) {
    console.warn(
      `Only ${allMdFiles.length} markdown files found. Adjusting to ${finalEach} blogs and ${finalEach} events.`
    );
  }

  const blogFiles = allMdFiles.slice(0, finalEach);
  const eventFiles = allMdFiles.slice(finalEach, finalEach * 2);

  // helper to strip <pre> wrappers and any html that follows, leaving only inner markdown
  function sanitizeMarkdown(raw: string): string {
    const preMatch = raw.match(PRE_BLOCK_RE);
    let content = raw;
    if (preMatch && typeof preMatch[1] === 'string' && preMatch[1].length > 0) {
      content = preMatch[1];
    }
    content = content.replace(TRIM_NEWLINES_RE, '');
    return content;
  }

  const [rawBlogContents, rawEventDescriptions] = await Promise.all([
    Promise.all(blogFiles.map((f) => fs.readFile(path.join(mdDir, f), 'utf8'))),
    Promise.all(eventFiles.map((f) => fs.readFile(path.join(mdDir, f), 'utf8'))),
  ]);

  const blogContents = rawBlogContents.map(sanitizeMarkdown);
  const eventDescriptions = rawEventDescriptions.map(sanitizeMarkdown);

  const blogTitles = blogFiles.map((f) => f.replace(MD_EXT_RE, '').replace(UNDERSCORE_RE, ' '));
  const eventTitles = eventFiles.map((f) => `Meetup: ${f.replace(MD_EXT_RE, '').replace(UNDERSCORE_RE, ' ')}`);

  // generate plausible event dates (some past, some future)
  const eventDates = Array.from({ length: finalEach }, () => {
    const now = new Date();
    const offsetDays = Math.floor(Math.random() * EVENT_DAYS_RANGE);
    const sign = Math.random() < PAST_FUTURE_SPLIT ? -1 : 1;
    const d = new Date(now);
    d.setDate(now.getDate() + sign * offsetDays);
    d.setHours(EVENT_HOUR, EVENT_MINUTE, EVENT_SECOND, EVENT_MS);
    return d;
  });

  // don't seed the auth tables, only the public schema
  await seed(
    db,
    {
      talks,
      events,
      newsletterSubscriptions,
      members,
      blogs,
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
          title: generators.valuesFromArray({ values: eventTitles, isUnique: true }),
          description: generators.valuesFromArray({ values: eventDescriptions, isUnique: true }),
          location: generators.valuesFromArray({ values: ['Pula', 'Zagreb', 'Split'] }),
          // @ts-expect-error: this works with drizzle
          eventAt: generators.valuesFromArray({ values: eventDates }),
        },
        count: finalEach,
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
      blogs: {
        columns: {
          title: generators.valuesFromArray({ values: blogTitles, isUnique: true }),
          content: generators.valuesFromArray({ values: blogContents, isUnique: true }),
        },
        count: finalEach,
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
