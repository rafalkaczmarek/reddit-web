import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-products-stock-toolbar',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './products-stock-toolbar.html',
  styleUrl: './products-stock-toolbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsStockToolbar {
  public readonly searchChange = output<string>();
  public readonly addProduct = output<void>();

  protected onSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchChange.emit(value);
  }

  protected onAddProduct(): void {
    this.addProduct.emit();
  }
}
