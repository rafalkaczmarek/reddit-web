import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { ProductStock } from '@admin-panel-web/features/products-stock/types/product-stock.interface';

@Component({
  selector: 'app-products-stock-table',
  imports: [CurrencyPipe, MatTableModule, MatSortModule, MatIconModule, MatButtonModule],
  templateUrl: './products-stock-table.html',
  styleUrl: './products-stock-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsStockTable {
  public readonly products = input.required<ProductStock[]>();

  protected readonly displayedColumns = ['image', 'name', 'category', 'price', 'piece', 'availableColors', 'action'];
  protected readonly dataSource = computed(() => this.products());

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
