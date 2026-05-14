import type { Locator } from '@playwright/test';

export function firstRowProductNameCell(table: Locator): Locator {
  return table.locator('tbody tr').first().locator('td').nth(1);
}
