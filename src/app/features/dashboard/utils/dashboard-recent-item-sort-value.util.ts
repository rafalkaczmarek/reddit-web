import { DashboardRecentItem } from '@admin-panel-web/features/dashboard/types/dashboard-recent-item.interface';

const SORTABLE_COLUMNS = ['productName', 'orderId', 'date', 'customer', 'status', 'amount'] as const;

type DashboardRecentSortableColumn = (typeof SORTABLE_COLUMNS)[number];

function isDashboardRecentSortableColumn(value: string): value is DashboardRecentSortableColumn {
  return (SORTABLE_COLUMNS as readonly string[]).includes(value);
}

export function getDashboardRecentItemSortValue(row: DashboardRecentItem, active: string): string | number {
  if (!isDashboardRecentSortableColumn(active)) {
    return '';
  }

  if (active === 'amount') {
    return Number(row.amount.replace(/[^\d.-]/g, '')) || 0;
  }

  return row[active];
}
