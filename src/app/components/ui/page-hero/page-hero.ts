import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { PageDescription } from '../page-description/page-description';
import { PageHeading } from '../page-heading/page-heading';

@Component({
  selector: 'app-page-hero',
  imports: [PageHeading, PageDescription],
  templateUrl: './page-hero.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHero {
  public readonly title = input.required<string>();
  public readonly headingId = input<string | null>(null);
  public readonly description = input<string | null>(null);
}
