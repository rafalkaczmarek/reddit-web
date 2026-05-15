import { Injectable, PLATFORM_ID, inject, signal, effect } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'app-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  public readonly mode = signal<ThemeMode>(this.resolveInitialTheme());

  constructor() {
    effect(() => {
      if (!this.isBrowser) {
        return;
      }
      const current = this.mode();
      document.documentElement.classList.toggle('dark-theme', current === 'dark');
      localStorage.setItem(STORAGE_KEY, current);
    });
  }

  public toggle(): void {
    this.mode.update((current) => (current === 'light' ? 'dark' : 'light'));
  }

  private resolveInitialTheme(): ThemeMode {
    if (!this.isBrowser) {
      return 'light';
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }

    return typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
}
