import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort, SortDirection } from '@angular/material/sort';

import { DashboardRecentItem } from '@admin-panel-web/features/dashboard/types/dashboard-recent-item.interface';
import { getDashboardRecentItemSortValue } from '@admin-panel-web/features/dashboard/utils/dashboard-recent-item-sort-value.util';
import { sortByColumn } from '@admin-panel-web/shared/utils/sort-by-column.util';

@Component({
  selector: 'app-recent-orders-table',
  imports: [MatTableModule, MatSortModule],
  templateUrl: './recent-orders-table.html',
  styleUrl: './recent-orders-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentOrdersTable {
  public readonly items = input.required<DashboardRecentItem[]>();

  protected readonly displayedColumns = ['productName', 'orderId', 'date', 'customer', 'status', 'amount'];

  protected readonly sortActive = signal<string>('');
  protected readonly sortDirection = signal<SortDirection>('');

  protected readonly sortedItems = computed(() =>
    sortByColumn(
      this.items(),
      this.sortActive(),
      this.sortDirection(),
      getDashboardRecentItemSortValue
    )
  );

  protected onMatSortChange(sort: Sort): void {
    this.sortActive.set(sort.direction === '' ? '' : sort.active);
    this.sortDirection.set(sort.direction);
  }

  protected statusLabel(status: DashboardRecentItem['status']): string {
    const labels: Record<DashboardRecentItem['status'], string> = {
      delivered: 'Delivered',
      pending: 'Pending',
      cancelled: 'Cancelled',
      processing: 'Processing',
    };
    return labels[status];
  }
}
