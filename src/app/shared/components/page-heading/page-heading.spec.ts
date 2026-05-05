import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageHeading } from '@admin-panel-web/shared/components/page-heading/page-heading';

describe('PageHeading', () => {
  let component: PageHeading;
  let fixture: ComponentFixture<PageHeading>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageHeading],
    }).compileComponents();

    fixture = TestBed.createComponent(PageHeading);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('text', 'Dashboard');
    fixture.componentRef.setInput('id', 'dashboard-heading');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render heading text and id', () => {
    const headingElement = fixture.nativeElement.querySelector('h1');

    expect(headingElement.textContent.trim()).toBe('Dashboard');
    expect(headingElement.getAttribute('id')).toBe('dashboard-heading');
  });
});
