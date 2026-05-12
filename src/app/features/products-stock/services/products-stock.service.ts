import { Injectable, inject, signal, computed } from '@angular/core';

import { ProductStock } from '@admin-panel-web/features/products-stock/types/product-stock.interface';
import { ProductsStockRepository } from '@admin-panel-web/features/products-stock/services/products-stock.repository';

import { catchError, finalize, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsStockService {
  private readonly repository = inject(ProductsStockRepository);

  private readonly _products = signal<ProductStock[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);
  private readonly _searchQuery = signal('');
  private readonly _pageIndex = signal(0);
  private readonly _pageSize = signal(10);

  public readonly loading = this._loading.asReadonly();
  public readonly error = this._error.asReadonly();

  public readonly filteredProducts = computed(() => {
    const query = this._searchQuery().toLowerCase().trim();
    const products = this._products();
    if (!query) {
      return products;
    }
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );
  });

  public readonly totalCount = computed(() => this.filteredProducts().length);

  public readonly paginatedProducts = computed(() => {
    const start = this._pageIndex() * this._pageSize();
    return this.filteredProducts().slice(start, start + this._pageSize());
  });

  public readonly pageIndex = this._pageIndex.asReadonly();
  public readonly pageSize = this._pageSize.asReadonly();

  public readonly isEmpty = computed(
    () =>
      !this._loading() &&
      !this._error() &&
      this._products().length === 0
  );

  public loadProducts(): void {
    this._loading.set(true);
    this._error.set(null);

    this.repository
      .getProducts()
      .pipe(
        catchError((err: unknown) => {
          const message =
            err instanceof Error ? err.message : 'Failed to load products.';
          this._error.set(message);
          return of(null);
        }),
        finalize(() => this._loading.set(false))
      )
      .subscribe((result) => {
        if (result) {
          this._products.set(result);
        }
      });
  }

  public search(query: string): void {
    this._searchQuery.set(query);
    this._pageIndex.set(0);
  }

  public changePage(pageIndex: number, pageSize: number): void {
    this._pageIndex.set(pageIndex);
    this._pageSize.set(pageSize);
  }
}
