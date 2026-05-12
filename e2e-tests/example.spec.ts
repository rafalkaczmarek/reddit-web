import { test, expect } from '@playwright/test';

test.describe('Admin panel app', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('redirects to dashboard and renders key content', async ({ page }) => {
    await expect(page).toHaveURL(/\/dashboard$/);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByRole('region', { name: 'Charts overview' })).toBeVisible();
    await expect(page.getByRole('table', { name: 'Recent orders table' })).toBeVisible();
  });

  test('navigates to products stock page from sidebar', async ({ page }) => {
    await page.getByRole('treeitem', { name: 'Products Stock' }).click();

    await expect(page).toHaveURL(/\/products-stock$/);
    await expect(page.getByRole('heading', { name: 'Products Stock' })).toBeVisible();
    await expect(page.getByRole('table', { name: 'Products' })).toBeVisible();
  });

  test('filters products using search field', async ({ page }) => {
    await page.getByRole('treeitem', { name: 'Products Stock' }).click();

    const searchInput = page.getByRole('searchbox', {
      name: 'Search products by name or category',
    });
    await searchInput.fill('Samsung');

    await expect(page.getByRole('cell', { name: 'Samsung A50', exact: true })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Apple Watch Series 4' })).toHaveCount(0);
  });

  test('toggles theme from sidebar button', async ({ page }) => {
    const toggleButton = page.getByRole('button', { name: 'Switch to dark mode' });
    await expect(toggleButton).toBeVisible();

    await toggleButton.click();

    await expect(page.getByRole('button', { name: 'Switch to light mode' })).toBeVisible();
  });
});
