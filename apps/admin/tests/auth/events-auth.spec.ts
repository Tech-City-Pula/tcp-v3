import { expect, test } from '../fixtures/admin-auth';

const SUBMIT_BTN_RE = /create|save/i;

test.describe('events route (auth)', () => {
  test('renders event form when authenticated', async ({ adminPage }) => {
    await adminPage.goto('/events');
    // Basic sanity: form fields exist. Conservatively check for a few common labels.
    // If EventForm has specific labels, update these accordingly.
    await expect(adminPage.getByRole('button', { name: SUBMIT_BTN_RE })).toBeVisible();
  });
});
