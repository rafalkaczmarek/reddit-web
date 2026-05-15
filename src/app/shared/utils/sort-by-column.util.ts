import { SortDirection } from '@angular/material/sort';

import { compareSortValues } from '@admin-panel-web/shared/utils/compare-sort-values.util';

export function sortByColumn<T>(
  items: readonly T[],
  active: string,
  direction: SortDirection,
  getSortValue: (item: T, active: string) => string | number
): T[] {
  const rows = [...items];

  if (!active || direction === '') {
    return rows;
  }

  const factor = direction === 'asc' ? 1 : -1;
  rows.sort(
    (a, b) =>
      factor * compareSortValues(getSortValue(a, active), getSortValue(b, active))
  );

  return rows;
}
