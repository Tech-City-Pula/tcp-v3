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
  retries: 1,
  workers: undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:3001',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    // Public tests (logged-out flows)
    {
      name: 'public',
      // Exclude both auth tests and setup tests
      testMatch: [/tests\/public\//],
      use: { ...devices['Desktop Chrome'] },
      // No dependency on admin setup
    },
    // Authenticated admin tests reuse prepared storage state
    {
      name: 'admin',
      testMatch: /tests\/auth\//,
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3001',
    reuseExistingServer: true,
    timeout: WEB_SERVER_TIMEOUT_MS,
  },
});
