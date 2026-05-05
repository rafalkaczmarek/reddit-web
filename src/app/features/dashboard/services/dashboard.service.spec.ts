import { TestBed } from '@angular/core/testing';

import { DashboardKpi } from '@admin-panel-web/types/dashboard-kpi.interface';
import { DashboardRecentItem } from '@admin-panel-web/types/dashboard-recent-item.interface';
import { DashboardRepository } from '@admin-panel-web/features/dashboard/services/dashboard.repository';
import { DashboardService } from '@admin-panel-web/features/dashboard/services/dashboard.service';

import { of, throwError } from 'rxjs';

const MOCK_KPIS: DashboardKpi[] = [
  { id: 'k1', title: 'Users', value: '100', icon: 'las la-user', trend: 'up', trendValue: '5%', color: 'blue' },
];

const MOCK_ITEMS: DashboardRecentItem[] = [
  { id: '1', productName: 'Widget', orderId: '#001', date: '2024-01-01', customer: 'Alice', status: 'delivered', amount: '$10' },
];

function createMockRepository(overrides: Partial<DashboardRepository> = {}): Partial<DashboardRepository> {
  return {
    getKpis: () => of(MOCK_KPIS),
    getRecentItems: () => of(MOCK_ITEMS),
    ...overrides,
  };
}

describe('DashboardService', () => {
  let service: DashboardService;
  let repository: Partial<DashboardRepository>;

  function setup(overrides: Partial<DashboardRepository> = {}): void {
    repository = createMockRepository(overrides);

    TestBed.configureTestingModule({
      providers: [{ provide: DashboardRepository, useValue: repository }],
    });
    service = TestBed.inject(DashboardService);
  }

  it('should be created', () => {
    setup();
    expect(service).toBeTruthy();
  });

  it('should start with empty state', () => {
    setup();
    expect(service.kpis()).toEqual([]);
    expect(service.recentItems()).toEqual([]);
    expect(service.loading()).toBe(false);
    expect(service.error()).toBeNull();
    expect(service.isEmpty()).toBe(true);
  });

  it('should populate kpis and recentItems after loading', () => {
    setup();
    service.loadDashboard();

    expect(service.kpis()).toEqual(MOCK_KPIS);
    expect(service.recentItems()).toEqual(MOCK_ITEMS);
    expect(service.loading()).toBe(false);
    expect(service.isEmpty()).toBe(false);
  });

  it('should set error on repository failure', () => {
    setup({
      getKpis: () => throwError(() => new Error('Network error')),
    });

    service.loadDashboard();

    expect(service.error()).toBe('Network error');
    expect(service.loading()).toBe(false);
    expect(service.kpis()).toEqual([]);
  });

  it('should set fallback error message for non-Error throws', () => {
    setup({
      getKpis: () => throwError(() => 'unknown'),
    });

    service.loadDashboard();

    expect(service.error()).toBe('Failed to load dashboard data.');
  });

  it('should clear previous error on retry', () => {
    setup({
      getKpis: () => throwError(() => new Error('fail')),
    });

    service.loadDashboard();
    expect(service.error()).toBeTruthy();

    repository.getKpis = () => of(MOCK_KPIS);
    service.loadDashboard();

    expect(service.error()).toBeNull();
    expect(service.kpis()).toEqual(MOCK_KPIS);
    expect(service.loading()).toBe(false);
  });
});
