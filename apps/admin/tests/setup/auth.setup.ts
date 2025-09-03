import { test as setup } from '@playwright/test';
import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const AUTH_FILE = path.join(__dirname, '../../playwright/.auth/admin.json');

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'admin@example.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'password';

setup('authenticate admin and save storage state', async ({ page, context, baseURL }) => {
  // Go to home (login form shows when logged out)
  await page.goto(baseURL ?? 'http://localhost:3001');

  // Fill login form and submit
  await page.getByRole('textbox', { name: 'password' }).fill(ADMIN_PASSWORD);
  await page.getByRole('textbox', { name: 'email' }).fill(ADMIN_EMAIL);

  // await page.getByRole('button', { name: 'login' }).click();

  await page.waitForResponse(
    (response) => response.url().includes('/api/auth/sign-in/email') && response.status() === 200
  );

  // Save auth state for reuse
  fs.mkdirSync(path.dirname(AUTH_FILE), { recursive: true });
  await context.storageState({ path: AUTH_FILE });
});
