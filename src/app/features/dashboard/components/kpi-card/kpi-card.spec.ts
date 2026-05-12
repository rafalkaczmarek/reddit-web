import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardKpi } from '@admin-panel-web/features/dashboard/types/dashboard-kpi.interface';
import { KpiCard } from '@admin-panel-web/features/dashboard/components/kpi-card/kpi-card';

const MOCK_KPI: DashboardKpi = {
  id: 'kpi-test',
  title: 'Total Users',
  value: '1,234',
  icon: 'las la-user',
  trend: 'up',
  trendValue: '5% Up',
  color: 'blue',
};

describe('KpiCard', () => {
  let component: KpiCard;
  let fixture: ComponentFixture<KpiCard>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KpiCard],
    }).compileComponents();

    fixture = TestBed.createComponent(KpiCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('kpi', MOCK_KPI);
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the KPI title', () => {
    expect(el.querySelector('.kpi-title')?.textContent).toContain('Total Users');
  });

  it('should display the KPI value', () => {
    expect(el.querySelector('.kpi-value')?.textContent).toContain('1,234');
  });

  it('should display the trend value', () => {
    expect(el.querySelector('.kpi-trend')?.textContent).toContain('5% Up');
  });

  it('should apply trend-up class for upward trend', () => {
    expect(el.querySelector('.kpi-trend.trend-up')).not.toBeNull();
  });

  it('should apply trend-down class for downward trend', () => {
    const downKpi: DashboardKpi = { ...MOCK_KPI, trend: 'down' };
    fixture.componentRef.setInput('kpi', downKpi);
    fixture.detectChanges();

    expect(el.querySelector('.kpi-trend.trend-down')).not.toBeNull();
  });

  it('should set icon aria-hidden to true', () => {
    const icon = el.querySelector('.kpi-icon i');
    expect(icon?.getAttribute('aria-hidden')).toBe('true');
  });

  it('should compute correct color variable for blue', () => {
    const iconSpan = el.querySelector('.kpi-icon') as HTMLElement;
    expect(iconSpan.style.background).toContain('var(--kpi-blue)');
  });

  it('should render the trend icon with correct class', () => {
    const trendIcon = el.querySelector('.kpi-trend i');
    expect(trendIcon?.classList.contains('la-arrow-up')).toBe(true);
  });
});
