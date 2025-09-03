import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, test as setup } from '@playwright/test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const AUTH_FILE = path.join(__dirname, '../../playwright/.auth/admin.json');

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'admin@example.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'password';

setup.describe.configure({ mode: 'serial' });

const LOGIN_BTN_RE = /^login$/i;
const FIVE_SECONDS = 5000;
const HAS_CREDS = Boolean(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD);

// Skip setup if no admin credentials provided
setup.skip(!HAS_CREDS, 'Set ADMIN_EMAIL and ADMIN_PASSWORD to run admin-auth tests');

setup('authenticate admin and save storage state', async ({ page, context, baseURL }) => {
  await context.tracing.start({ screenshots: true, snapshots: true });

  // Go to home (login form shows when logged out)
  await page.goto(baseURL ?? 'http://localhost:3001');

  // Fill login form and submit
  await page.getByLabel('email').fill(ADMIN_EMAIL);
  await page.getByLabel('password').fill(ADMIN_PASSWORD);
  // Trigger validation updates by blurring fields
  await page.getByLabel('email').blur();
  await page.getByLabel('password').blur();
  // Submit via Enter to avoid disabled button edge cases
  await page.getByLabel('password').press('Enter');

  // Expect we are logged in: look for any stable indicator
  // If your LoggedInPanel renders a sign-out button or greeting, check that here.
  // As a generic check, ensure login button disappears.
  await expect(page.getByRole('button', { name: LOGIN_BTN_RE })).toBeHidden({ timeout: FIVE_SECONDS });

  // Save auth state for reuse
  fs.mkdirSync(path.dirname(AUTH_FILE), { recursive: true });
  await context.storageState({ path: AUTH_FILE });

  await context.tracing.stop({ path: 'test-results/auth-setup-trace.zip' });
});
