import { TestBed } from '@angular/core/testing';

import { ProductsStockRepository } from '@admin-panel-web/features/products-stock/services/products-stock.repository';

import { firstValueFrom } from 'rxjs';

describe('ProductsStockRepository', () => {
  let repository: ProductsStockRepository;

  beforeEach(() => {
    vi.useFakeTimers();
    TestBed.configureTestingModule({});
    repository = TestBed.inject(ProductsStockRepository);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be created', () => {
    expect(repository).toBeTruthy();
  });

  it('should return products after delay', async () => {
    const promise = firstValueFrom(repository.getProducts());
    vi.advanceTimersByTime(600);

    const result = await promise;
    expect(result).toBeDefined();
    expect(result.length).toBe(8);
  });

  it('should return products with required fields', async () => {
    const promise = firstValueFrom(repository.getProducts());
    vi.advanceTimersByTime(600);

    const result = await promise;
    for (const product of result) {
      expect(product.id).toBeTruthy();
      expect(product.name).toBeTruthy();
      expect(product.category).toBeTruthy();
      expect(product.price).toBeGreaterThanOrEqual(0);
      expect(product.availableColors.length).toBeGreaterThan(0);
    }
  });
});
