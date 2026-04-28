import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-page-content',
  templateUrl: './page-content.html',
  styleUrl: './page-content.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageContent {
  public readonly ariaLive = input<string | null>(null);
  public readonly ariaLabelledBy = input<string | null>(null);
}
