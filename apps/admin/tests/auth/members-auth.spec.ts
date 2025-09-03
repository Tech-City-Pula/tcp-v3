import { expect, test } from '../fixtures/admin-auth';

const CREATE_MEMBER_BTN_RE = /create member/i;

test.describe('members route (auth)', () => {
  test('renders member form when authenticated', async ({ adminPage }) => {
    await adminPage.goto('/members');
    await expect(adminPage.getByLabel('firstName')).toBeVisible();
    await expect(adminPage.getByLabel('lastName')).toBeVisible();
    await expect(adminPage.getByLabel('email')).toBeVisible();
    await expect(adminPage.getByRole('button', { name: CREATE_MEMBER_BTN_RE })).toBeVisible();
  });
});
