import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { AuthSession } from '@admin-panel-web/features/auth/types/auth-session.interface';

import { Observable, delay, of, tap, throwError } from 'rxjs';

const STORAGE_KEY = 'app-auth-session';
const DEMO_EMAIL = 'admin@dashstack.com';
const DEMO_PASSWORD = 'admin123';
const SIMULATED_REQUEST_MS = 300;

export const INVALID_CREDENTIALS_MESSAGE = 'Incorrect email or password.';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly _session = signal<AuthSession | null>(this.readStoredSession());

  public readonly session = this._session.asReadonly();
  public readonly isAuthenticated = computed(() => this._session() !== null);

  public login(email: string, password: string): Observable<AuthSession> {
    const normalizedEmail = email.trim().toLowerCase();
    const isValid = normalizedEmail === DEMO_EMAIL && password === DEMO_PASSWORD;

    if (!isValid) {
      return throwError(() => new Error(INVALID_CREDENTIALS_MESSAGE)).pipe(
        delay(SIMULATED_REQUEST_MS),
      );
    }

    const newSession: AuthSession = {
      email: normalizedEmail,
      loggedInAt: new Date().toISOString(),
    };

    return of(newSession).pipe(
      delay(SIMULATED_REQUEST_MS),
      tap((session) => this.persistSession(session)),
    );
  }

  public logout(): void {
    this._session.set(null);
    this.clearStoredSession();
  }

  private persistSession(session: AuthSession): void {
    this._session.set(session);
    this.writeStoredSession(session);
  }

  private readStoredSession(): AuthSession | null {
    if (!this.isBrowser) {
      return null;
    }
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    try {
      return JSON.parse(raw) as AuthSession;
    } catch {
      window.sessionStorage.removeItem(STORAGE_KEY);
      return null;
    }
  }

  private writeStoredSession(session: AuthSession): void {
    if (!this.isBrowser) {
      return;
    }
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  }

  private clearStoredSession(): void {
    if (!this.isBrowser) {
      return;
    }
    window.sessionStorage.removeItem(STORAGE_KEY);
  }
}
