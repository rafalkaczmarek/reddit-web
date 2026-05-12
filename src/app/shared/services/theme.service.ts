import { Injectable, signal, effect } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'app-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  public readonly mode = signal<ThemeMode>(this.resolveInitialTheme());

  constructor() {
    effect(() => {
      const current = this.mode();
      document.documentElement.classList.toggle('dark-theme', current === 'dark');
      localStorage.setItem(STORAGE_KEY, current);
    });
  }

  public toggle(): void {
    this.mode.update((current) => (current === 'light' ? 'dark' : 'light'));
  }

  private resolveInitialTheme(): ThemeMode {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    return typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
}
