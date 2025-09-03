import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

import { defineConfig, devices } from '@playwright/test';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const WEB_SERVER_TIMEOUT_MS = 2 * MINUTE;

export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  forbidOnly: false,
  // Local-first: fast feedback; retries produce traces via 'on-first-retry'.
  retries: 3,
  // No worker limits; fixtures handle scoped auth.
  workers: undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:3001',
    trace: 'on-all-retries',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    // Public tests (logged-out flows)
    {
      name: 'public',
      // Match only public tests; no global setups, no storageState.
      testMatch: [/tests\/public\//],
      use: { ...devices['Desktop Chrome'] },
      // No dependencies; run standalone.
    },
    // Admin tests: use per-test fixtures for auth (no global setup or storageState).
    {
      name: 'admin',
      testMatch: /tests\/auth\//,
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
  webServer: {
    command: 'pnpm serve:e2e',
    url: 'http://localhost:3001',
    reuseExistingServer: true,
    timeout: WEB_SERVER_TIMEOUT_MS,
  },
});
