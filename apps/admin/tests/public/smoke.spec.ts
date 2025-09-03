import { expect, test } from '@playwright/test';
import { AdminHomePage } from '../page-objects/admin-home-page';

const HOME_URL_RE = /\/?$/;

test.describe('public smoke', () => {
  test('home shows login form', async ({ page }) => {
    const home = new AdminHomePage(page);
    await home.goto();
    await home.expectLoginFormVisible();
  });

  test('redirects to login from /events when logged out', async ({ page }) => {
    const home = new AdminHomePage(page);
    await page.goto('/events');
    await home.expectLoginFormVisible();
    await expect(page).toHaveURL(HOME_URL_RE);
  });

  test('redirects to login from /members when logged out', async ({ page }) => {
    const home = new AdminHomePage(page);
    await page.goto('/members');
    await home.expectLoginFormVisible();
    await expect(page).toHaveURL(HOME_URL_RE);
  });
});
