import { Page } from '@playwright/test';

const DEMO_EMAIL = 'admin@dashstack.com';
const DEMO_PASSWORD = 'admin123';

export async function loginAsDemoUser(page: Page): Promise<void> {
  await page.goto('/login');
  await page.getByLabel('Email address').fill(DEMO_EMAIL);
  await page.getByLabel('Password', { exact: true }).fill(DEMO_PASSWORD);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.waitForURL(/\/dashboard$/);
}
