import { TestBed } from '@angular/core/testing';

import { DashboardRepository } from '@admin-panel-web/features/dashboard/services/dashboard.repository';

import { firstValueFrom } from 'rxjs';

describe('DashboardRepository', () => {
  let repository: DashboardRepository;

  beforeEach(() => {
    vi.useFakeTimers();
    TestBed.configureTestingModule({});
    repository = TestBed.inject(DashboardRepository);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be created', () => {
    expect(repository).toBeTruthy();
  });

  it('should return KPIs after delay', async () => {
    const promise = firstValueFrom(repository.getKpis());
    vi.advanceTimersByTime(600);

    const result = await promise;
    expect(result).toBeDefined();
    expect(result.length).toBe(4);
  });

  it('should return recent items after delay', async () => {
    const promise = firstValueFrom(repository.getRecentItems());
    vi.advanceTimersByTime(800);

    const result = await promise;
    expect(result).toBeDefined();
    expect(result.length).toBe(6);
  });

  it('should return KPIs with required fields', async () => {
    const promise = firstValueFrom(repository.getKpis());
    vi.advanceTimersByTime(600);

    const result = await promise;
    for (const kpi of result) {
      expect(kpi.id).toBeTruthy();
      expect(kpi.title).toBeTruthy();
      expect(kpi.value).toBeTruthy();
    }
  });

  it('should return recent items with required fields', async () => {
    const promise = firstValueFrom(repository.getRecentItems());
    vi.advanceTimersByTime(800);

    const result = await promise;
    for (const item of result) {
      expect(item.id).toBeTruthy();
      expect(item.productName).toBeTruthy();
      expect(item.status).toBeTruthy();
    }
  });
});
