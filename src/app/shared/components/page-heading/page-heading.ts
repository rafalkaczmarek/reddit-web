import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-page-heading',
  templateUrl: './page-heading.html',
  styleUrl: './page-heading.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeading {
  public readonly text = input.required<string>();
  public readonly id = input<string | null>(null);
}
