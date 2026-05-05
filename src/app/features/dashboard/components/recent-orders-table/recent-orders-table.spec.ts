import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRecentItem } from '@admin-panel-web/types/dashboard-recent-item.interface';
import { RecentOrdersTable } from '@admin-panel-web/features/dashboard/components/recent-orders-table/recent-orders-table';

const MOCK_ITEMS: DashboardRecentItem[] = [
  { id: '1', productName: 'Apple Watch', orderId: '#APL-7281', date: '2024-12-12', customer: 'John', status: 'delivered', amount: '$120' },
  { id: '2', productName: 'MacBook Pro', orderId: '#MBP-3924', date: '2024-12-11', customer: 'Jane', status: 'pending', amount: '$1,799' },
  { id: '3', productName: 'iPhone 15', orderId: '#IPH-5102', date: '2024-12-10', customer: 'Bob', status: 'cancelled', amount: '$999' },
];

describe('RecentOrdersTable', () => {
  let component: RecentOrdersTable;
  let fixture: ComponentFixture<RecentOrdersTable>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentOrdersTable],
    }).compileComponents();

    fixture = TestBed.createComponent(RecentOrdersTable);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', MOCK_ITEMS);
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render section with aria-labelledby', () => {
    const section = el.querySelector('section');
    expect(section?.getAttribute('aria-labelledby')).toBe('recent-orders-heading');
  });

  it('should render h2 heading', () => {
    const heading = el.querySelector('h2#recent-orders-heading');
    expect(heading).not.toBeNull();
    expect(heading?.textContent).toContain('Recent Orders');
  });

  it('should render a table with aria-label', () => {
    const table = el.querySelector('table');
    expect(table?.getAttribute('aria-label')).toBe('Recent orders');
  });

  it('should render correct number of rows', () => {
    const rows = el.querySelectorAll('tr.mat-mdc-row');
    expect(rows.length).toBe(MOCK_ITEMS.length);
  });

  it('should render all column headers', () => {
    const headers = el.querySelectorAll('th.mat-mdc-header-cell');
    expect(headers.length).toBe(6);
  });

  it('should display product name in row', () => {
    const firstRow = el.querySelector('tr.mat-mdc-row');
    expect(firstRow?.textContent).toContain('Apple Watch');
  });

  it('should apply correct status class', () => {
    const badges = el.querySelectorAll('.status-badge');
    expect(badges[0]?.classList.contains('status-delivered')).toBe(true);
    expect(badges[1]?.classList.contains('status-pending')).toBe(true);
    expect(badges[2]?.classList.contains('status-cancelled')).toBe(true);
  });

  it('should render correct status label text in badges', () => {
    const badges = el.querySelectorAll('.status-badge');
    expect(badges[0]?.textContent?.trim()).toBe('Delivered');
    expect(badges[1]?.textContent?.trim()).toBe('Pending');
    expect(badges[2]?.textContent?.trim()).toBe('Cancelled');
  });
});
