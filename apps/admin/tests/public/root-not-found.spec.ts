import { expect, test } from '@playwright/test';

test.describe('root not found', () => {
  test('shows not found for unknown route', async ({ page }) => {
    await page.goto('/non-existent-path-xyz');
    await expect(page.getByText('not found')).toBeVisible();
  });
});
