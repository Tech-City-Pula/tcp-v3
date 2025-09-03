import { expect, test } from '@playwright/test';

const EMAIL_LABEL_RE = /email/i;
const PASSWORD_LABEL_RE = /password/i;
const SUBMIT_BTN_RE = /log in|sign in|login/i;
const SIGN_OUT_BTN_RE = /sign out/i;
const HOME_URL = '/';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'admin1@email.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? '12345678';

test.describe('login (ui)', () => {
  test('can log in via the form', async ({ page }) => {
    await test.step('Navigate to login page', async () => {
      await page.goto('/');
    });

    const email = page.getByLabel(EMAIL_LABEL_RE);
    const password = page.getByLabel(PASSWORD_LABEL_RE);
    const signInButton = page.getByRole('button', { name: SUBMIT_BTN_RE });
    const signoutButton = page.getByRole('button', { name: SIGN_OUT_BTN_RE });

    await test.step('Wait for form elements to be visible', async () => {
      await email.waitFor({ state: 'visible' });
      await password.waitFor({ state: 'visible' });
      await signInButton.waitFor({ state: 'visible' });
    });

    await test.step('Fill and submit login form', async () => {
      await email.fill(ADMIN_EMAIL);
      await password.fill(ADMIN_PASSWORD);
      await signInButton.click();
      await page.waitForLoadState('networkidle');
    });

    await test.step('Verify login success', async () => {
      await expect(signoutButton).toBeVisible();
      await expect(page).toHaveURL(HOME_URL);
    });

    await test.step('Sign out', async () => {
      await signoutButton.click();
      await page.waitForLoadState('networkidle');
    });

    await test.step('Verify sign-out', async () => {
      await email.waitFor({ state: 'visible' });
      await password.waitFor({ state: 'visible' });
      await signInButton.waitFor({ state: 'visible' });
    });
  });
});
