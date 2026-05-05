import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';

import { DashboardService } from '@admin-panel-web/features/dashboard/services/dashboard.service';
import { DashboardKpi } from '@admin-panel-web/types/dashboard-kpi.interface';
import { DashboardRecentItem } from '@admin-panel-web/types/dashboard-recent-item.interface';
import { DashboardPage } from '@admin-panel-web/features/dashboard/pages/dashboard-page/dashboard-page';

const MOCK_KPIS: DashboardKpi[] = [
  { id: 'k1', title: 'Users', value: '100', icon: 'las la-user', trend: 'up', trendValue: '5%', color: 'blue' },
];

const MOCK_ITEMS: DashboardRecentItem[] = [
  { id: '1', productName: 'Widget', orderId: '#001', date: '2024-01-01', customer: 'Alice', status: 'delivered', amount: '$10' },
];

function createMockDashboardService() {
  return {
    kpis: signal<DashboardKpi[]>([]),
    recentItems: signal<DashboardRecentItem[]>([]),
    loading: signal(false),
    error: signal<string | null>(null),
    isEmpty: signal(true),
    loadDashboard: vi.fn(),
  };
}

describe('DashboardPage', () => {
  let component: DashboardPage;
  let fixture: ComponentFixture<DashboardPage>;
  let el: HTMLElement;
  let mockService: ReturnType<typeof createMockDashboardService>;

  beforeEach(async () => {
    mockService = createMockDashboardService();

    await TestBed.configureTestingModule({
      imports: [DashboardPage],
      providers: [
        { provide: DashboardService, useValue: mockService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call loadDashboard on init', () => {
    fixture.detectChanges();
    expect(mockService.loadDashboard).toHaveBeenCalled();
  });

  it('should show spinner when loading', () => {
    mockService.loading.set(true);
    mockService.isEmpty.set(false);
    fixture.detectChanges();
    el = fixture.nativeElement;

    expect(el.querySelector('mat-spinner')).not.toBeNull();
    expect(el.querySelector('[role="status"]')).not.toBeNull();
  });

  it('should show error state with retry button', () => {
    mockService.error.set('Something went wrong');
    mockService.isEmpty.set(false);
    fixture.detectChanges();
    el = fixture.nativeElement;

    expect(el.querySelector('[role="alert"]')).not.toBeNull();
    expect(el.textContent).toContain('Something went wrong');

    const retryBtn = el.querySelector('[role="alert"] button') as HTMLButtonElement;
    expect(retryBtn).not.toBeNull();
    expect(retryBtn.textContent).toContain('Retry');
  });

  it('should call loadDashboard when retry is clicked', () => {
    mockService.error.set('fail');
    mockService.isEmpty.set(false);
    fixture.detectChanges();
    el = fixture.nativeElement;

    mockService.loadDashboard.mockClear();
    const retryBtn = el.querySelector('[role="alert"] button') as HTMLButtonElement;
    retryBtn.click();

    expect(mockService.loadDashboard).toHaveBeenCalled();
  });

  it('should show empty state when no data', () => {
    mockService.isEmpty.set(true);
    fixture.detectChanges();
    el = fixture.nativeElement;

    expect(el.textContent).toContain('No data available yet');
  });

  it('should render KPI cards when data is loaded', () => {
    mockService.loading.set(false);
    mockService.isEmpty.set(false);
    mockService.kpis.set(MOCK_KPIS);
    mockService.recentItems.set(MOCK_ITEMS);
    fixture.detectChanges();
    el = fixture.nativeElement;

    expect(el.querySelectorAll('app-kpi-card').length).toBe(1);
  });

  it('should render chart placeholders when data is loaded', () => {
    mockService.loading.set(false);
    mockService.isEmpty.set(false);
    mockService.kpis.set(MOCK_KPIS);
    mockService.recentItems.set(MOCK_ITEMS);
    fixture.detectChanges();
    el = fixture.nativeElement;

    expect(el.querySelectorAll('app-chart-placeholder').length).toBe(2);
  });

  it('should render recent orders table when data is loaded', () => {
    mockService.loading.set(false);
    mockService.isEmpty.set(false);
    mockService.kpis.set(MOCK_KPIS);
    mockService.recentItems.set(MOCK_ITEMS);
    fixture.detectChanges();
    el = fixture.nativeElement;

    expect(el.querySelector('app-recent-orders-table')).not.toBeNull();
  });

  it('should render page hero with Dashboard title', () => {
    fixture.detectChanges();
    el = fixture.nativeElement;

    expect(el.querySelector('app-page-hero')).not.toBeNull();
  });
});
