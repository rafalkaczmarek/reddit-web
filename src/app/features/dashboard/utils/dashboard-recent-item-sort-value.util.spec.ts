import { DashboardRecentItem } from '@admin-panel-web/features/dashboard/types/dashboard-recent-item.interface';
import { getDashboardRecentItemSortValue } from '@admin-panel-web/features/dashboard/utils/dashboard-recent-item-sort-value.util';

const ROW: DashboardRecentItem = {
  id: '1',
  productName: 'Apple Watch',
  orderId: '#APL-7281',
  date: '2024-12-12',
  customer: 'John',
  status: 'delivered',
  amount: '$1,799.50',
};

describe('getDashboardRecentItemSortValue', () => {
  it('should return product name for productName column', () => {
    expect(getDashboardRecentItemSortValue(ROW, 'productName')).toBe('Apple Watch');
  });

  it('should parse numeric amount', () => {
    expect(getDashboardRecentItemSortValue(ROW, 'amount')).toBe(1799.5);
  });

  it('should return empty string for unknown column', () => {
    expect(getDashboardRecentItemSortValue(ROW, 'unknown')).toBe('');
  });
});
