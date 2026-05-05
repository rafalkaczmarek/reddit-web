import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PageContent } from '@admin-panel-web/shared/components/page-content/page-content';
import { PageHero } from '@admin-panel-web/shared/components/page-hero/page-hero';

@Component({
  selector: 'app-products-page',
  imports: [PageContent, PageHero],
  templateUrl: './products-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsPage {}
