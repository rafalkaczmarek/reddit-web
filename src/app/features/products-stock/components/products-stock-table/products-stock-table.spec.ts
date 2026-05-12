import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsStockTable } from '@admin-panel-web/features/products-stock/components/products-stock-table/products-stock-table';
import { ProductStock } from '@admin-panel-web/features/products-stock/types/product-stock.interface';

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
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

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
});
