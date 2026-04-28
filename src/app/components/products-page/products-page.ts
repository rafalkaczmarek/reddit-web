import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PageContent } from '../ui/page-content/page-content';
import { PageHero } from '../ui/page-hero/page-hero';

@Component({
  selector: 'app-products-page',
  imports: [PageContent, PageHero],
  templateUrl: './products-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsPage {}
