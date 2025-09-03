import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

import { defineConfig, devices } from '@playwright/test';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const WEB_SERVER_TIMEOUT_MS = 2 * MINUTE;

export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? 'dot' : [['list'], ['html', { open: 'never' }]],
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
      testIgnore: [/tests\/auth\//, /tests\/setup\//],
      use: { ...devices['Desktop Chrome'] },
      // No dependency on admin setup
    },
    // Authenticated admin tests reuse prepared storage state
    {
      name: 'admin',
      testMatch: /tests\/auth\//,
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/admin.json',
      },
      dependencies: ['setup-admin'],
    },
    // Admin-specific setup: authenticates and saves admin storage state
    {
      name: 'setup-admin',
      // Match only the dedicated admin auth setup file
      testMatch: 'tests/setup/auth.setup.ts',
    },
  ],
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3001',
    reuseExistingServer: !process.env.CI,
    timeout: WEB_SERVER_TIMEOUT_MS,
  },
});
