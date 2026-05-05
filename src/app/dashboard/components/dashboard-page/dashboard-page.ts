import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PageContent } from '@admin-panel-web/shared/components/page-content/page-content';
import { PageHero } from '@admin-panel-web/shared/components/page-hero/page-hero';

@Component({
  selector: 'app-dashboard-page',
  imports: [PageContent, PageHero],
  templateUrl: './dashboard-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage {}
