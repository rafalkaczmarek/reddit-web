import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { PageContent } from '@admin-panel-web/shared/components/page-content/page-content';
import { PageHero } from '@admin-panel-web/shared/components/page-hero/page-hero';
import { ProductsStockService } from '@admin-panel-web/features/products-stock/services/products-stock.service';
import { ProductsStockToolbar } from '@admin-panel-web/features/products-stock/components/products-stock-toolbar/products-stock-toolbar';
import { ProductsStockTable } from '@admin-panel-web/features/products-stock/components/products-stock-table/products-stock-table';

@Component({
  selector: 'app-products-stock-page',
  imports: [
    MatProgressSpinnerModule,
    MatButtonModule,
    MatPaginatorModule,
    PageContent,
    PageHero,
    ProductsStockToolbar,
    ProductsStockTable,
  ],
  templateUrl: './products-stock-page.html',
  styleUrl: './products-stock-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsStockPage implements OnInit {
  protected readonly service = inject(ProductsStockService);

  public ngOnInit(): void {
    this.service.loadProducts();
  }

  protected retry(): void {
    this.service.loadProducts();
  }

  protected onSearch(query: string): void {
    this.service.search(query);
  }

  protected onAddProduct(): void {
    console.log('Add Product clicked');
  }

  protected onPageChange(event: PageEvent): void {
    this.service.changePage(event.pageIndex, event.pageSize);
  }
}
