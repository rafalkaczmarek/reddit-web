import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-page-description',
  templateUrl: './page-description.html',
  styleUrl: './page-description.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageDescription {
  public readonly text = input.required<string>();
}
