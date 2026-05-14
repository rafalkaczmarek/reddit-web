import { Injectable, inject, signal, computed } from '@angular/core';
import { Sort, SortDirection } from '@angular/material/sort';

import { ProductStock } from '@admin-panel-web/features/products-stock/types/product-stock.interface';
import { ProductsStockRepository } from '@admin-panel-web/features/products-stock/services/products-stock.repository';
import { compareSortValues } from '@admin-panel-web/features/products-stock/utils/compare-sort-values.util';
import { getProductStockSortValue } from '@admin-panel-web/features/products-stock/utils/product-stock-sort-value.util';

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
  private readonly _sortActive = signal<string>('');
  private readonly _sortDirection = signal<SortDirection>('');

  public readonly loading = this._loading.asReadonly();
  public readonly error = this._error.asReadonly();
  public readonly sortActive = this._sortActive.asReadonly();
  public readonly sortDirection = this._sortDirection.asReadonly();

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

  public readonly sortedFilteredProducts = computed(() => {
    const rows = [...this.filteredProducts()];
    const active = this._sortActive();
    const direction = this._sortDirection();
    if (!active || direction === '') {
      return rows;
    }
    const mult = direction === 'desc' ? -1 : 1;
    rows.sort(
      (a, b) =>
        compareSortValues(
          getProductStockSortValue(a, active),
          getProductStockSortValue(b, active)
        ) * mult
    );
    return rows;
  });

  public readonly totalCount = computed(() => this.sortedFilteredProducts().length);

  public readonly paginatedProducts = computed(() => {
    const sorted = this.sortedFilteredProducts();
    const start = this._pageIndex() * this._pageSize();
    return sorted.slice(start, start + this._pageSize());
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

  public changeSort(sort: Sort): void {
    this._sortActive.set(sort.direction === '' ? '' : sort.active);
    this._sortDirection.set(sort.direction);
    this._pageIndex.set(0);
  }
}
