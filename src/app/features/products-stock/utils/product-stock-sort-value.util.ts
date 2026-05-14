import { ProductStock } from '@admin-panel-web/features/products-stock/types/product-stock.interface';
import {
  type ProductStockSortableColumn,
  isProductStockSortableColumn,
} from '@admin-panel-web/features/products-stock/types/product-stock-sortable-column.type';

const SORT_VALUE_BY_COLUMN: Record<ProductStockSortableColumn, (row: ProductStock) => string | number> = {
  name: (row) => row.name,
  category: (row) => row.category,
  price: (row) => row.price,
  piece: (row) => row.status,
};

export function getProductStockSortValue(row: ProductStock, active: string): string | number {
  if (!isProductStockSortableColumn(active)) {
    return '';
  }
  return SORT_VALUE_BY_COLUMN[active](row);
}
