import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { DashboardKpi } from '@admin-panel-web/types/dashboard-kpi.interface';

@Component({
  selector: 'app-kpi-card',
  imports: [MatCardModule],
  templateUrl: './kpi-card.html',
  styleUrl: './kpi-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KpiCard {
  public readonly kpi = input.required<DashboardKpi>();

  protected readonly iconClass = computed(() => this.kpi().icon);

  protected readonly trendIcon = computed(() => {
    switch (this.kpi().trend) {
      case 'up':
        return 'las la-arrow-up';
      case 'down':
        return 'las la-arrow-down';
      default:
        return 'las la-minus';
    }
  });

  protected readonly colorVar = computed(() => {
    const colorMap: Record<DashboardKpi['color'], string> = {
      green: 'var(--kpi-green)',
      red: 'var(--kpi-red)',
      blue: 'var(--kpi-blue)',
      orange: 'var(--kpi-orange)',
    };
    return colorMap[this.kpi().color];
  });
}
