import { test as base, type Page, expect as pwExpect } from '@playwright/test';

type Fixtures = {
  adminPage: Page;
};

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'admin1@email.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? '12345678';
const SESSION_COOKIE_NAME = 'better-auth.session_token';
const LOGIN_POLL_ATTEMPTS = 40;
const LOGIN_POLL_INTERVAL_MS = 250;

export const test = base.extend<Fixtures>({
  adminPage: async ({ page, context, baseURL }, use) => {
    const endpoint = new URL('/api/auth/sign-in/email', baseURL ?? 'http://localhost:3001').toString();
    await page.request.post(endpoint, {
      data: {
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      },
    });

    // Ensure cookie is present
    let hasSession = false;
    for (let i = 0; i < LOGIN_POLL_ATTEMPTS && !hasSession; i++) {
      const cookies = await context.cookies();
      hasSession = cookies.some((c) => c.name === SESSION_COOKIE_NAME);
      if (!hasSession) {
        await page.waitForTimeout(LOGIN_POLL_INTERVAL_MS);
      }
    }
    pwExpect(hasSession).toBeTruthy();

    await use(page);
  },
});

export const expect = pwExpect;
