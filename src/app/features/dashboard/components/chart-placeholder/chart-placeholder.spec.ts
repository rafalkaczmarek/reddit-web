import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { ChartPlaceholder } from '@admin-panel-web/features/dashboard/components/chart-placeholder/chart-placeholder';

describe('ChartPlaceholder', () => {
  let component: ChartPlaceholder;
  let fixture: ComponentFixture<ChartPlaceholder>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartPlaceholder],
      providers: [provideAnimationsAsync()],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartPlaceholder);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('title', 'Sales Details');
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title as h2', () => {
    const heading = el.querySelector('h2.chart-title');
    expect(heading).not.toBeNull();
    expect(heading?.textContent).toContain('Sales Details');
  });

  it('should render a chart area placeholder', () => {
    expect(el.querySelector('.chart-area')).not.toBeNull();
  });

  it('should display placeholder text', () => {
    expect(el.querySelector('.chart-text')?.textContent).toContain('Chart will be rendered here');
  });

  it('should have decorative icon hidden from assistive technology', () => {
    const icon = el.querySelector('.chart-icon');
    expect(icon?.getAttribute('aria-hidden')).toBe('true');
  });
});
