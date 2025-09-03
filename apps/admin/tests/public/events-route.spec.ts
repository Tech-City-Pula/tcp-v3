import { expect, test } from '@playwright/test';
import { AdminHomePage } from '../page-objects/admin-home-page';

const ROOT_URL_RE = /\/$/;

test.describe('events route', () => {
  test('redirects to login when logged out', async ({ page }) => {
    const home = new AdminHomePage(page);
    await page.goto('/events');
    // Should end up on the login page
    await expect(page).toHaveURL(ROOT_URL_RE);
    await home.expectLoginFormVisible();
  });
});
