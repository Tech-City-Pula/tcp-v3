import { expect, type Locator, type Page } from '@playwright/test';

const LOGIN_BUTTON_NAME = /^login$/i;

export class AdminHomePage {
  readonly page: Page;
  readonly emailLabel: Locator;
  readonly passwordLabel: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailLabel = page.getByLabel('email');
    this.passwordLabel = page.getByLabel('password');
    this.submitButton = page.getByRole('button', { name: LOGIN_BUTTON_NAME });
  }

  async goto() {
    await this.page.goto('/');
  }

  async expectLoginFormVisible() {
    await expect(this.emailLabel).toBeVisible();
    await expect(this.passwordLabel).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }
}
