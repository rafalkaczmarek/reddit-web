export function compareSortValues(a: string | number, b: string | number): number {
  if (typeof a === 'number' && typeof b === 'number') {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  }

  return String(a).localeCompare(String(b), undefined, { sensitivity: 'base', numeric: true });
}
