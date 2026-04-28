import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageContent } from './page-content';

describe('PageContent', () => {
  let component: PageContent;
  let fixture: ComponentFixture<PageContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageContent],
    }).compileComponents();

    fixture = TestBed.createComponent(PageContent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('ariaLive', 'polite');
    fixture.componentRef.setInput('ariaLabelledBy', 'heading-id');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind aria attributes on main element', () => {
    const mainElement = fixture.nativeElement.querySelector('main');

    expect(mainElement.getAttribute('aria-live')).toBe('polite');
    expect(mainElement.getAttribute('aria-labelledby')).toBe('heading-id');
  });
});
