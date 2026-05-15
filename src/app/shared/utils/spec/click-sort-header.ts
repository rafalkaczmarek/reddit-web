import { ComponentFixture } from '@angular/core/testing';

export function clickSortHeader(
  fixture: ComponentFixture<unknown>,
  root: HTMLElement,
  column: string,
  clicks = 1,
): void {
  const header = root.querySelector(`th.mat-column-${column}`) as HTMLElement;
  for (let i = 0; i < clicks; i++) {
    header.click();
    fixture.detectChanges();
  }
}
