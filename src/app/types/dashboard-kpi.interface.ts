export interface DashboardKpi {
  readonly id: string;
  readonly title: string;
  readonly value: string;
  readonly icon: string;
  readonly trend: 'up' | 'down' | 'neutral';
  readonly trendValue: string;
  readonly color: 'green' | 'red' | 'blue' | 'orange';
}
