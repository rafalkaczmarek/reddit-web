import { expect, test } from '@playwright/test';

import { clickColumnSortButton } from '../utils/click-column-sort-button.util';
import { firstRowProductNameCell } from '../utils/first-row-product-name-cell.util';
import { waitForProductsTableLoaded } from '../utils/wait-for-products-table-loaded.util';

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

  test.describe('table sorting', () => {
    test('sorts by product name ascending', async ({ page }) => {
      await page.goto('/products-stock');
      const table = await waitForProductsTableLoaded(page);

      await clickColumnSortButton(table, 'Product Name');

      await expect(firstRowProductNameCell(table)).toHaveText('Apple Airpods');
    });

    test('sorts by product name descending', async ({ page }) => {
      await page.goto('/products-stock');
      const table = await waitForProductsTableLoaded(page);

      await clickColumnSortButton(table, 'Product Name');
      await clickColumnSortButton(table, 'Product Name');

      await expect(firstRowProductNameCell(table)).toHaveText("Women's Casual Wear");
    });

    test('sorts by price ascending', async ({ page }) => {
      await page.goto('/products-stock');
      const table = await waitForProductsTableLoaded(page);

      await clickColumnSortButton(table, 'Price');

      await expect(firstRowProductNameCell(table)).toHaveText('Apple Airpods');
    });

    test('sorts by category ascending', async ({ page }) => {
      await page.goto('/products-stock');
      const table = await waitForProductsTableLoaded(page);

      await clickColumnSortButton(table, 'Category');

      await expect(firstRowProductNameCell(table)).toHaveText('Apple Watch Series 4');
    });

    test('sorts by piece column using stock status (descending puts out-of-stock first)', async ({
      page,
    }) => {
      await page.goto('/products-stock');
      const table = await waitForProductsTableLoaded(page);

      await clickColumnSortButton(table, 'Piece');
      await clickColumnSortButton(table, 'Piece');

      await expect(firstRowProductNameCell(table)).toHaveText('Samsung A50');
    });
  });

  test.describe('table pagination', () => {
    test('shows the next slice of products after changing page size and using next page', async ({
      page,
    }) => {
      await page.goto('/products-stock');
      const table = await waitForProductsTableLoaded(page);
      const paginator = page.getByRole('group', { name: 'Select page of product stock' });

      await paginator.locator('.mat-mdc-paginator-touch-target').click();
      await page.getByRole('option', { name: '5', exact: true }).click();

      await expect(table.locator('tbody tr')).toHaveCount(5);

      await paginator.getByRole('button', { name: 'Next page' }).click();

      await expect(firstRowProductNameCell(table)).toHaveText('Sennheiser Case');
      await expect(
        page.getByRole('cell', { name: 'Apple Watch Series 4', exact: true })
      ).toHaveCount(0);
    });
  });
});
