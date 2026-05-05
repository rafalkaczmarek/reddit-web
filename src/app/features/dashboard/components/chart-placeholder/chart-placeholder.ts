import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-chart-placeholder',
  imports: [MatCardModule],
  templateUrl: './chart-placeholder.html',
  styleUrl: './chart-placeholder.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartPlaceholder {
  public readonly title = input.required<string>();
}
