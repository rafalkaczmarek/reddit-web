import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Sort } from '@angular/material/sort';

import { ProductsStockTable } from '@admin-panel-web/features/products-stock/components/products-stock-table/products-stock-table';
import { ProductStock } from '@admin-panel-web/features/products-stock/types/product-stock.interface';
import { getProductStockSortValue } from '@admin-panel-web/features/products-stock/utils/product-stock-sort-value.util';
import { sortByColumn } from '@admin-panel-web/shared/utils/sort-by-column.util';
import { clickSortHeader } from '@admin-panel-web/shared/utils/spec/click-sort-header';

const MOCK_PRODUCTS: ProductStock[] = [
  {
    id: 'p1',
    image: 'https://placehold.co/48',
    name: 'Apple Watch',
    category: 'Electronic',
    price: 690,
    piece: 63,
    availableColors: ['#333333', '#4880ff'],
    status: 'in-stock',
  },
  {
    id: 'p2',
    image: 'https://placehold.co/48',
    name: 'Samsung Phone',
    category: 'Mobile',
    price: 400,
    piece: 0,
    availableColors: ['#f93c65'],
    status: 'out-of-stock',
  },
];

describe('ProductsStockTable', () => {
  let component: ProductsStockTable;
  let fixture: ComponentFixture<ProductsStockTable>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsStockTable],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsStockTable);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('products', MOCK_PRODUCTS);
    component.sortChange.subscribe((sort: Sort) => applySort(sort));
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  function applySort(sort: Sort): void {
    const active = sort.direction === '' ? '' : sort.active;
    const direction = sort.direction;
    fixture.componentRef.setInput('sortActive', active);
    fixture.componentRef.setInput('sortDirection', direction);
    fixture.componentRef.setInput(
      'products',
      sortByColumn(MOCK_PRODUCTS, active, direction, getProductStockSortValue),
    );
    fixture.detectChanges();
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render products table', () => {
    const table = el.querySelector('table');
    expect(table?.getAttribute('aria-label')).toBe('Products');
  });

  it('should render expected row count', () => {
    const rows = el.querySelectorAll('tr.mat-mdc-row');
    expect(rows.length).toBe(MOCK_PRODUCTS.length);
  });

  it('should render stock status badges', () => {
    const badges = el.querySelectorAll('.status-badge');
    expect(badges[0]?.textContent?.trim()).toBe('In Stock');
    expect(badges[1]?.textContent?.trim()).toBe('Out of Stock');
  });

  it('should render action buttons with labels', () => {
    const editButton = el.querySelector('[aria-label="Edit Apple Watch"]');
    const deleteButton = el.querySelector('[aria-label="Delete Apple Watch"]');

    expect(editButton).not.toBeNull();
    expect(deleteButton).not.toBeNull();
  });

  function expectRowOrder(first: string, last: string): void {
    const rows = el.querySelectorAll('tr.mat-mdc-row');
    expect(rows[0]?.textContent).toContain(first);
    expect(rows[rows.length - 1]?.textContent).toContain(last);
  }

  it.each([
    { column: 'name', first: 'Apple Watch', last: 'Samsung Phone' },
    { column: 'category', first: 'Electronic', last: 'Mobile' },
    { column: 'price', first: '$400.00', last: '$690.00' },
    { column: 'piece', first: 'In Stock', last: 'Out of Stock' },
  ])(
    'should sort rows by $column ascending when header is clicked',
    ({ column, first, last }) => {
      clickSortHeader(fixture, el, column);
      expectRowOrder(first, last);
    },
  );

  it.each([
    { column: 'name', first: 'Samsung Phone', last: 'Apple Watch' },
    { column: 'category', first: 'Mobile', last: 'Electronic' },
    { column: 'price', first: '$690.00', last: '$400.00' },
    { column: 'piece', first: 'Out of Stock', last: 'In Stock' },
  ])(
    'should sort rows by $column descending when header is clicked twice',
    ({ column, first, last }) => {
      clickSortHeader(fixture, el, column, 2);
      expectRowOrder(first, last);
    },
  );
});
