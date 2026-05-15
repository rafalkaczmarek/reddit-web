import { sortByColumn } from '@admin-panel-web/shared/utils/sort-by-column.util';

interface Row {
  readonly name: string;
  readonly price: number;
}

const ROWS: Row[] = [
  { name: 'Banana', price: 3 },
  { name: 'Apple', price: 1 },
  { name: 'Cherry', price: 2 },
];

describe('sortByColumn', () => {
  it('should return a copy when sort is inactive', () => {
    const result = sortByColumn(ROWS, '', '', (row) => row.name);

    expect(result).toEqual(ROWS);
    expect(result).not.toBe(ROWS);
  });

  it('should sort ascending by resolved column value', () => {
    const result = sortByColumn(ROWS, 'name', 'asc', (row, active) =>
      active === 'name' ? row.name : row.price
    );

    expect(result.map((row) => row.name)).toEqual(['Apple', 'Banana', 'Cherry']);
  });

  it('should sort descending by resolved column value', () => {
    const result = sortByColumn(ROWS, 'price', 'desc', (row, active) =>
      active === 'price' ? row.price : row.name
    );

    expect(result.map((row) => row.price)).toEqual([3, 2, 1]);
  });
});
