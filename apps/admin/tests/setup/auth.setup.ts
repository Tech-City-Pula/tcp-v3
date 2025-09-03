import { expect, test as setup } from '@playwright/test';
import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const AUTH_FILE = path.join(__dirname, '../../playwright/.auth/admin.json');

// Hoisted regex for biome lint performance rule
const EMAIL_LABEL_RE = /email/i;
const PASSWORD_LABEL_RE = /password/i;
const SUBMIT_BTN_RE = /log in|sign in|login/i;

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'admin@example.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'password';

setup('authenticate admin and save storage state', async ({ page, context, baseURL }) => {
  // selectors
  const email = page.getByLabel(EMAIL_LABEL_RE);
  const password = page.getByLabel(PASSWORD_LABEL_RE);
  const submit = page.getByRole('button', { name: SUBMIT_BTN_RE });

  await setup.step('Visit the login screen', async () => {
    await page.goto(baseURL ?? 'http://localhost:3001');
  });
  await setup.step('Wait for form to render (avoid hydration races)', async () => {
    await Promise.all([
      email.waitFor({ state: 'visible' }),
      password.waitFor({ state: 'visible' }),
      submit.waitFor({ state: 'visible' }),
    ]);
  });
  await setup.step('Enter credentials', async () => {
    // Fill login form in a hydration-safe way
    await email.fill(ADMIN_EMAIL);
    await password.fill(ADMIN_PASSWORD);
    await password.blur();
    await expect(email).toHaveValue(ADMIN_EMAIL);
  });
  await setup.step('Submit and wait for login response', async () => {
    await submit.click();
    await page.waitForResponse((r) => r.url().includes('/api/auth/sign-in/email') && r.ok());
  });
  await setup.step('Save cookies', async () => {
    fs.mkdirSync(path.dirname(AUTH_FILE), { recursive: true });
    await context.storageState({ path: AUTH_FILE });
  });
});
