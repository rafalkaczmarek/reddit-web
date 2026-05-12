import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsStockToolbar } from '@admin-panel-web/features/products-stock/components/products-stock-toolbar/products-stock-toolbar';

describe('ProductsStockToolbar', () => {
  let component: ProductsStockToolbar;
  let fixture: ComponentFixture<ProductsStockToolbar>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsStockToolbar],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsStockToolbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit searchChange on input', () => {
    const spy = vi.fn();
    component.searchChange.subscribe(spy);

    const input = el.querySelector('input[type="search"]') as HTMLInputElement;
    input.value = 'apple';
    input.dispatchEvent(new Event('input'));

    expect(spy).toHaveBeenCalledWith('apple');
  });

  it('should emit addProduct on button click', () => {
    const spy = vi.fn();
    component.addProduct.subscribe(spy);

    const addButton = el.querySelector('[aria-label="Add new product"]') as HTMLButtonElement;
    addButton.click();

    expect(spy).toHaveBeenCalled();
  });
});
