import { test, expect } from '@playwright/test';

test.describe('Products stock', () => {
  test('navigates to products stock page from sidebar', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('treeitem', { name: 'Products Stock' }).click();

    await expect(page).toHaveURL(/\/products-stock$/);
    await expect(page.getByRole('heading', { name: 'Products Stock' })).toBeVisible();
    await expect(page.getByRole('table', { name: 'Products' })).toBeVisible();
  });

  test('filters products using search field', async ({ page }) => {
    await page.goto('/products-stock');

    const searchInput = page.getByRole('searchbox', {
      name: 'Search products by name or category',
    });
    await searchInput.fill('Samsung');

    await expect(page.getByRole('cell', { name: 'Samsung A50', exact: true })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Apple Watch Series 4' })).toHaveCount(0);
  });
});
