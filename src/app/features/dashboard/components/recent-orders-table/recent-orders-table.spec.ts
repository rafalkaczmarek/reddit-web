import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRecentItem } from '@admin-panel-web/features/dashboard/types/dashboard-recent-item.interface';
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
    expect(table?.getAttribute('aria-label')).toBe('Recent orders table');
  });

  function clickSortHeader(column: string, clicks = 1): void {
    const header = el.querySelector(`th.mat-column-${column}`) as HTMLElement;
    for (let i = 0; i < clicks; i++) {
      header.click();
      fixture.detectChanges();
    }
  }

  function expectRowOrder(first: string, last: string): void {
    const rows = el.querySelectorAll('tr.mat-mdc-row');
    expect(rows[0]?.textContent).toContain(first);
    expect(rows[rows.length - 1]?.textContent).toContain(last);
  }

  it.each([
    { column: 'productName', first: 'Apple Watch', last: 'MacBook Pro' },
    { column: 'orderId', first: '#APL-7281', last: '#MBP-3924' },
    { column: 'date', first: '2024-12-10', last: '2024-12-12' },
    { column: 'customer', first: 'Bob', last: 'John' },
    { column: 'status', first: 'Cancelled', last: 'Pending' },
    { column: 'amount', first: '$120', last: '$1,799' },
  ])(
    'should sort rows by $column ascending when header is clicked',
    ({ column, first, last }) => {
      clickSortHeader(column);
      expectRowOrder(first, last);
    },
  );

  it.each([
    { column: 'productName', first: 'MacBook Pro', last: 'Apple Watch' },
    { column: 'orderId', first: '#MBP-3924', last: '#APL-7281' },
    { column: 'date', first: '2024-12-12', last: '2024-12-10' },
    { column: 'customer', first: 'John', last: 'Bob' },
    { column: 'status', first: 'Pending', last: 'Cancelled' },
    { column: 'amount', first: 'MacBook Pro', last: 'Apple Watch' },
  ])(
    'should sort rows by $column descending when header is clicked twice',
    ({ column, first, last }) => {
      clickSortHeader(column, 2);
      expectRowOrder(first, last);
    },
  );

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
