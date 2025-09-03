import { expect, test } from '@playwright/test';

const CREATE_MEMBER_BTN_RE = /create member/i;

test.describe('members route (auth)', () => {
  test('renders member form when authenticated', async ({ page }) => {
    await page.goto('/members');
    await expect(page.getByLabel('firstName')).toBeVisible();
    await expect(page.getByLabel('lastName')).toBeVisible();
    await expect(page.getByLabel('email')).toBeVisible();
    await expect(page.getByRole('button', { name: CREATE_MEMBER_BTN_RE })).toBeVisible();
  });
});
