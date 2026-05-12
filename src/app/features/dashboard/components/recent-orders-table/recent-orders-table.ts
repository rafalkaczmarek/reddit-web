import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

import { DashboardRecentItem } from '@admin-panel-web/features/dashboard/types/dashboard-recent-item.interface';

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

  protected readonly dataSource = computed(() => this.items());

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
