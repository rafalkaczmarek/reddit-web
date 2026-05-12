import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('redirects to dashboard and renders key content', async ({ page }) => {
    await expect(page).toHaveURL(/\/dashboard$/);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByRole('region', { name: 'Charts overview' })).toBeVisible();
    await expect(page.getByRole('table', { name: 'Recent orders table' })).toBeVisible();
  });

  test('toggles theme from sidebar button', async ({ page }) => {
    const toggleButton = page.getByRole('button', { name: 'Switch to dark mode' });
    await expect(toggleButton).toBeVisible();

    await toggleButton.click();

    await expect(page.getByRole('button', { name: 'Switch to light mode' })).toBeVisible();
  });
});
