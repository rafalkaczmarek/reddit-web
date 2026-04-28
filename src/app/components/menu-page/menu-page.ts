import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { PageContent } from '../ui/page-content/page-content';
import { PageHero } from '../ui/page-hero/page-hero';

@Component({
  selector: 'app-menu-page',
  imports: [PageContent, PageHero],
  templateUrl: './menu-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuPage {
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly routeParamMap = toSignal(this.activatedRoute.paramMap, {
    initialValue: this.activatedRoute.snapshot.paramMap,
  });

  protected readonly pageTitle = computed(() => {
    const page = this.routeParamMap().get('page') ?? 'dashboard';
    return this.formatPageTitle(page);
  });

  private formatPageTitle(page: string): string {
    return page
      .split('-')
      .filter((segment) => segment.length > 0)
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
      .join(' ');
  }
}
