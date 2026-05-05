import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

import { PageContent } from '@admin-panel-web/shared/components/page-content/page-content';
import { PageHero } from '@admin-panel-web/shared/components/page-hero/page-hero';
import { DashboardService } from '@admin-panel-web/features/dashboard/services/dashboard.service';
import { KpiCard } from '@admin-panel-web/features/dashboard/components/kpi-card/kpi-card';
import { ChartPlaceholder } from '@admin-panel-web/features/dashboard/components/chart-placeholder/chart-placeholder';
import { RecentOrdersTable } from '@admin-panel-web/features/dashboard/components/recent-orders-table/recent-orders-table';

@Component({
  selector: 'app-dashboard-page',
  imports: [
    MatProgressSpinnerModule,
    MatButtonModule,
    PageContent,
    PageHero,
    KpiCard,
    ChartPlaceholder,
    RecentOrdersTable,
  ],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage implements OnInit {
  protected readonly service = inject(DashboardService);

  public ngOnInit(): void {
    this.service.loadDashboard();
  }

  protected retry(): void {
    this.service.loadDashboard();
  }
}
