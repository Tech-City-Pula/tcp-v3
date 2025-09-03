import { test } from '@playwright/test';
import { AdminHomePage } from '../page-objects/admin-home-page';

test.describe('index route', () => {
  test('shows login form when logged out', async ({ page }) => {
    const home = new AdminHomePage(page);
    await home.goto();
    await home.expectLoginFormVisible();
  });
});
