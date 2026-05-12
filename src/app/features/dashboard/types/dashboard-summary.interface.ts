import { DashboardKpi } from '@admin-panel-web/features/dashboard/types/dashboard-kpi.interface';
import { DashboardRecentItem } from '@admin-panel-web/features/dashboard/types/dashboard-recent-item.interface';

export interface DashboardSummary {
  readonly kpis: DashboardKpi[];
  readonly recentItems: DashboardRecentItem[];
}
