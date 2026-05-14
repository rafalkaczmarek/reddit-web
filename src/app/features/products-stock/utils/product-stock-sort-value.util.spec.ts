import { ProductStock } from '@admin-panel-web/features/products-stock/types/product-stock.interface';
import { getProductStockSortValue } from '@admin-panel-web/features/products-stock/utils/product-stock-sort-value.util';

const ROW: ProductStock = {
  id: 'p1',
  image: '',
  name: 'Alpha',
  category: 'Gadgets',
  price: 42.5,
  piece: 100,
  availableColors: ['#333333'],
  status: 'out-of-stock',
};

describe('getProductStockSortValue', () => {
  it('should return name for active name', () => {
    expect(getProductStockSortValue(ROW, 'name')).toBe('Alpha');
  });

  it('should return category for active category', () => {
    expect(getProductStockSortValue(ROW, 'category')).toBe('Gadgets');
  });

  it('should return price for active price', () => {
    expect(getProductStockSortValue(ROW, 'price')).toBe(42.5);
  });

  it('should return status for active piece column', () => {
    expect(getProductStockSortValue(ROW, 'piece')).toBe('out-of-stock');
  });

  it('should return empty string for unknown active key', () => {
    expect(getProductStockSortValue(ROW, 'unknown')).toBe('');
  });
});
