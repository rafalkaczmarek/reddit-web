import { Injectable, inject, signal, computed } from '@angular/core';

import { DashboardKpi } from '@admin-panel-web/types/dashboard-kpi.interface';
import { DashboardRecentItem } from '@admin-panel-web/types/dashboard-recent-item.interface';
import { DashboardRepository } from '@admin-panel-web/features/dashboard/services/dashboard.repository';

import { catchError, finalize, of, forkJoin } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly repository = inject(DashboardRepository);

  private readonly _kpis = signal<DashboardKpi[]>([]);
  private readonly _recentItems = signal<DashboardRecentItem[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  public readonly kpis = this._kpis.asReadonly();
  public readonly recentItems = this._recentItems.asReadonly();
  public readonly loading = this._loading.asReadonly();
  public readonly error = this._error.asReadonly();

  public readonly isEmpty = computed(
    () => !this._loading() && !this._error() && this._kpis().length === 0 && this._recentItems().length === 0
  );

  public loadDashboard(): void {
    this._loading.set(true);
    this._error.set(null);

    forkJoin({
      kpis: this.repository.getKpis(),
      recentItems: this.repository.getRecentItems(),
    })
      .pipe(
        catchError((err: unknown) => {
          const message = err instanceof Error ? err.message : 'Failed to load dashboard data.';
          this._error.set(message);
          return of(null);
        }),
        finalize(() => this._loading.set(false))
      )
      .subscribe((result) => {
        if (result) {
          this._kpis.set(result.kpis);
          this._recentItems.set(result.recentItems);
        }
      });
  }
}
