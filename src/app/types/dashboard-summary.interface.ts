import { DashboardKpi } from '@admin-panel-web/types/dashboard-kpi.interface';
import { DashboardRecentItem } from '@admin-panel-web/types/dashboard-recent-item.interface';

export interface DashboardSummary {
  readonly kpis: DashboardKpi[];
  readonly recentItems: DashboardRecentItem[];
}
