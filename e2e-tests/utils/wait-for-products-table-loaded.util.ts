import { expect, type Locator, type Page } from '@playwright/test';

export async function waitForProductsTableLoaded(page: Page): Promise<Locator> {
  const table = page.getByRole('table', { name: 'Products' });
  await expect(table).toBeVisible();
  await expect(
    page.getByRole('cell', { name: 'Apple Watch Series 4', exact: true })
  ).toBeVisible();
  return table;
}
