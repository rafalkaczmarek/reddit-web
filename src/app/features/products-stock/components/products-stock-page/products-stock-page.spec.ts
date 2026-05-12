import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';

import { ProductsStockPage } from '@admin-panel-web/features/products-stock/components/products-stock-page/products-stock-page';
import { ProductsStockService } from '@admin-panel-web/features/products-stock/services/products-stock.service';
import { ProductStock } from '@admin-panel-web/features/products-stock/types/product-stock.interface';

const MOCK_PRODUCTS: ProductStock[] = [
  {
    id: 'p1',
    image: '',
    name: 'Apple Watch',
    category: 'Electronic',
    price: 690,
    piece: 63,
    availableColors: ['#333'],
    status: 'in-stock',
  },
];

function createMockProductsStockService() {
  return {
    paginatedProducts: signal<ProductStock[]>([]),
    filteredProducts: signal<ProductStock[]>([]),
    totalCount: signal(0),
    pageIndex: signal(0),
    pageSize: signal(10),
    loading: signal(false),
    error: signal<string | null>(null),
    isEmpty: signal(true),
    loadProducts: vi.fn(),
    search: vi.fn(),
    changePage: vi.fn(),
  };
}

describe('ProductsStockPage', () => {
  let component: ProductsStockPage;
  let fixture: ComponentFixture<ProductsStockPage>;
  let el: HTMLElement;
  let mockService: ReturnType<typeof createMockProductsStockService>;

  beforeEach(async () => {
    mockService = createMockProductsStockService();

    await TestBed.configureTestingModule({
      imports: [ProductsStockPage],
      providers: [{ provide: ProductsStockService, useValue: mockService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsStockPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call loadProducts on init', () => {
    fixture.detectChanges();
    expect(mockService.loadProducts).toHaveBeenCalled();
  });

  it('should render loading state', () => {
    mockService.loading.set(true);
    mockService.isEmpty.set(false);
    fixture.detectChanges();
    el = fixture.nativeElement;

    expect(el.querySelector('mat-spinner')).not.toBeNull();
  });

  it('should render error state', () => {
    mockService.error.set('Load failed');
    mockService.isEmpty.set(false);
    fixture.detectChanges();
    el = fixture.nativeElement;

    expect(el.querySelector('[role="alert"]')).not.toBeNull();
    expect(el.textContent).toContain('Load failed');
  });

  it('should render table and paginator for data state', () => {
    mockService.loading.set(false);
    mockService.isEmpty.set(false);
    mockService.paginatedProducts.set(MOCK_PRODUCTS);
    mockService.totalCount.set(1);
    fixture.detectChanges();
    el = fixture.nativeElement;

    expect(el.querySelector('app-products-stock-table')).not.toBeNull();
    expect(el.querySelector('mat-paginator')).not.toBeNull();
  });
});
