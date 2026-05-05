import { TestBed } from '@angular/core/testing';

import { ThemeService } from '@admin-panel-web/shared/services/theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark-theme');

    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark-theme');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should default to light when no stored preference', () => {
    expect(service.mode()).toBe('light');
  });

  it('should toggle from light to dark', () => {
    service.toggle();
    expect(service.mode()).toBe('dark');
  });

  it('should toggle from dark back to light', () => {
    service.toggle();
    service.toggle();
    expect(service.mode()).toBe('light');
  });

  it('should add dark-theme class to documentElement when dark', () => {
    service.toggle();
    TestBed.flushEffects();

    expect(document.documentElement.classList.contains('dark-theme')).toBe(true);
  });

  it('should remove dark-theme class when switching back to light', () => {
    service.toggle();
    TestBed.flushEffects();
    service.toggle();
    TestBed.flushEffects();

    expect(document.documentElement.classList.contains('dark-theme')).toBe(false);
  });

  it('should persist theme to localStorage', () => {
    service.toggle();
    TestBed.flushEffects();

    expect(localStorage.getItem('app-theme')).toBe('dark');
  });

  it('should restore dark theme from localStorage', () => {
    localStorage.setItem('app-theme', 'dark');

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    const freshService = TestBed.inject(ThemeService);

    expect(freshService.mode()).toBe('dark');
  });

  it('should use prefers-color-scheme when matchMedia is available', () => {
    localStorage.clear();
    const originalMatchMedia = window.matchMedia;
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: vi.fn().mockReturnValue({ matches: true }),
    });

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    const darkService = TestBed.inject(ThemeService);

    expect(darkService.mode()).toBe('dark');

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: originalMatchMedia,
    });
  });
});
