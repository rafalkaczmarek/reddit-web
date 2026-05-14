import { compareSortValues } from '@admin-panel-web/features/products-stock/utils/compare-sort-values.util';

describe('compareSortValues', () => {
  it('should return negative when first number is less than second', () => {
    expect(compareSortValues(1, 2)).toBeLessThan(0);
  });

  it('should return positive when first number is greater than second', () => {
    expect(compareSortValues(3, 2)).toBeGreaterThan(0);
  });

  it('should return zero when numbers are equal', () => {
    expect(compareSortValues(7, 7)).toBe(0);
  });

  it('should order strings lexicographically for ascending comparison', () => {
    expect(compareSortValues('a', 'b')).toBeLessThan(0);
  });

  it('should use numeric collation for digit strings', () => {
    expect(compareSortValues('2', '10')).toBeLessThan(0);
  });
});
