export const PRODUCT_STOCK_SORTABLE_COLUMNS = ['name', 'category', 'price', 'piece'] as const;

export type ProductStockSortableColumn = (typeof PRODUCT_STOCK_SORTABLE_COLUMNS)[number];

export function isProductStockSortableColumn(value: string): value is ProductStockSortableColumn {
  return (PRODUCT_STOCK_SORTABLE_COLUMNS as readonly string[]).includes(value);
}
