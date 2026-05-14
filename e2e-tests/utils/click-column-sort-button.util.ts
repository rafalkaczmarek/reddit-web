import { expect, type Locator } from '@playwright/test';

export async function clickColumnSortButton(table: Locator, name: string | RegExp): Promise<void> {
  const button = table.locator('thead tr').getByRole('button', { name });
  await expect(button).toBeVisible();
  await button.click();
}
