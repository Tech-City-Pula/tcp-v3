import 'dotenv/config';
import { Command } from 'commander';
import prompts from 'prompts';
import { z } from 'zod';
import { createAdminUser } from '../lib/queries/index.ts';

const write = (msg: string): void => {
  process.stdout.write(`${msg}\n`);
};

const writeErr = (msg: string): void => {
  process.stderr.write(`${msg}\n`);
};

const PASSWORD_MIN_LENGTH = 8;

const schema = z.object({
  email: z.string({ error: 'Email is required' }).email('Email must be a valid email address'),
  password: z
    .string({ error: 'Password is required' })
    .min(PASSWORD_MIN_LENGTH, `Password must be at least ${PASSWORD_MIN_LENGTH} characters`),
  name: z.string({ error: 'Name is required' }).min(2, 'Name must be at least 2 characters'),
});

type Input = { email?: string; password?: string; name?: string };

function resolveFromEnvAndFlags(opts: { email?: string; password?: string; name?: string; username?: string }): Input {
  const out: Input = {};
  const email = opts.email ?? process.env.ADMIN_EMAIL;
  const password = opts.password ?? process.env.ADMIN_PASSWORD;
  const name = opts.name ?? opts.username ?? process.env.ADMIN_NAME;
  if (email !== undefined) {
    out.email = email;
  }
  if (password !== undefined) {
    out.password = password;
  }
  if (name !== undefined) {
    out.name = name;
  }
  return out;
}

async function promptMissing(input: Input): Promise<Required<Input>> {
  let { email, password, name } = input;

  const missing: Array<keyof Required<Input>> = [];
  if (!email) {
    missing.push('email');
  }
  if (!password) {
    missing.push('password');
  }
  if (!name) {
    missing.push('name');
  }

  if (missing.length > 0 && process.stdin.isTTY) {
    const questions: prompts.PromptObject[] = missing.map((field) => {
      if (field === 'password') {
        return {
          type: 'password',
          name: 'password',
          message: 'Admin password',
        } as const;
      }
      if (field === 'email') {
        return {
          type: 'text',
          name: 'email',
          message: 'Admin email address',
        } as const;
      }
      return {
        type: 'text',
        name: 'name',
        message: 'Admin full name',
      } as const;
    });

    const answers = await prompts(questions, {
      onCancel: () => {
        writeErr('Cancelled. No user created.');
        process.exit(1);
      },
    });
    email = email ?? (answers.email as string | undefined);
    password = password ?? (answers.password as string | undefined);
    name = name ?? (answers.name as string | undefined);
  }

  return { email: email ?? '', password: password ?? '', name: name ?? '' };
}

async function main(): Promise<void> {
  const program = new Command();
  program
    .name('create-admin-user')
    .description('Create an admin user')
    .addHelpText(
      'after',
      [
        '',
        'Environment fallbacks:',
        '  ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME',
        '',
        'Examples:',
        '  pnpm script:create-admin -- --email user@example.com --password secret123 --name "Jane Doe"',
        '  ADMIN_EMAIL=a@b.com ADMIN_PASSWORD=secret ADMIN_NAME="Jane Doe" pnpm script:create-admin',
      ].join('\n')
    )
    .option('-e, --email <email>', 'Admin email address')
    .option('-p, --password <password>', 'Admin password')
    .option('-n, --name <name>', 'Admin full name')
    .option('--username <username>', 'Alias for --name (admin full name)');

  program.parse(process.argv);
  const opts = program.opts<{
    email?: string;
    password?: string;
    name?: string;
    username?: string;
  }>();

  const fromFlags = resolveFromEnvAndFlags(opts);
  const collected = await promptMissing(fromFlags);

  const result = schema.safeParse(collected);
  if (!result.success) {
    for (const issue of result.error.issues) {
      writeErr(`Error: ${issue.message}`);
    }
    writeErr('Failed to create admin user due to invalid inputs.');
    process.exit(1);
    return;
  }

  try {
    await createAdminUser(result.data);
    write('Admin user created successfully.');
    process.exit(0);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error creating admin user';
    writeErr(`Failed to create admin user: ${message}`);
    process.exit(1);
  }
}

await main();
