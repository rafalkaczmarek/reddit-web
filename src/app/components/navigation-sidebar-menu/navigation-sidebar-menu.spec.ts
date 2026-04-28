import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { NavigationSidebarMenu } from './navigation-sidebar-menu';

describe('NavigationSidebarMenu', () => {
  let component: NavigationSidebarMenu;
  let fixture: ComponentFixture<NavigationSidebarMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationSidebarMenu],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationSidebarMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
