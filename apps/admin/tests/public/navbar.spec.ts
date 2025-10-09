import { expect, test } from '@playwright/test';

const LOGIN_URL_RE = /\/login/;

test.describe('navbar visibility', () => {
  test('navbar is not visible on login page', async ({ page }) => {
    await page.goto('/login');

    // Check that navbar navigation links are not present
    const homeLink = page.getByRole('link', { name: 'Home' });
    await expect(homeLink).not.toBeVisible();
  });

  test('navbar redirects to login when not authenticated', async ({ page }) => {
    // Try to access a protected route
    await page.goto('/events');

    // Should redirect to login, where navbar should not be visible
    await expect(page).toHaveURL(LOGIN_URL_RE);
    const homeLink = page.getByRole('link', { name: 'Home' });
    await expect(homeLink).not.toBeVisible();
  });
});
