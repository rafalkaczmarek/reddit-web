import { ProductStock } from '@admin-panel-web/features/products-stock/types/product-stock.interface';

export function getProductStockSortValue(row: ProductStock, active: string): string | number {
  switch (active) {
    case 'name':
      return row.name;
    case 'category':
      return row.category;
    case 'price':
      return row.price;
    case 'piece':
      return row.status;
    default:
      return '';
  }
}
