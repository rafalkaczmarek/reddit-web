import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort, SortDirection } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { ProductStock } from '@admin-panel-web/features/products-stock/types/product-stock.interface';
import { PRODUCT_STOCK_SORTABLE_COLUMNS } from '@admin-panel-web/features/products-stock/types/product-stock-sortable-column.type';

@Component({
  selector: 'app-products-stock-table',
  imports: [CurrencyPipe, MatTableModule, MatSortModule, MatIconModule, MatButtonModule],
  templateUrl: './products-stock-table.html',
  styleUrl: './products-stock-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsStockTable {
  public readonly products = input.required<ProductStock[]>();
  public readonly sortActive = input<string>('');
  public readonly sortDirection = input<SortDirection>('');
  public readonly sortChange = output<Sort>();

  protected readonly displayedColumns = [
    'image',
    ...PRODUCT_STOCK_SORTABLE_COLUMNS,
    'availableColors',
    'action',
  ];

  protected onMatSortChange(sort: Sort): void {
    this.sortChange.emit(sort);
  }

  protected statusLabel(status: ProductStock['status']): string {
    const labels: Record<ProductStock['status'], string> = {
      'in-stock': 'In Stock',
      'out-of-stock': 'Out of Stock',
    };

    return labels[status];
  }

  protected colorName(hex: string): string {
    const colorMap: Record<string, string> = {
      '#333333': 'Black',
      '#4880ff': 'Blue',
      '#00b69b': 'Green',
      '#f93c65': 'Red',
      '#ff9f43': 'Orange',
    };

    return colorMap[hex.toLowerCase()] ?? hex;
  }

  protected colorsAriaLabel(colors: string[]): string {
    return colors.map((color) => this.colorName(color)).join(', ');
  }
}
