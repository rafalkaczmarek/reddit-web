import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDescription } from '@admin-panel-web/shared/components/page-description/page-description';

describe('PageDescription', () => {
  let component: PageDescription;
  let fixture: ComponentFixture<PageDescription>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageDescription],
    }).compileComponents();

    fixture = TestBed.createComponent(PageDescription);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('text', 'Browse and manage your product catalog.');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render description text', () => {
    const paragraphElement = fixture.nativeElement.querySelector('p') as HTMLParagraphElement | null;

    expect(paragraphElement).not.toBeNull();
    expect(paragraphElement?.textContent?.trim()).toBe('Browse and manage your product catalog.');
  });
});
