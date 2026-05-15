import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';

import { LoginPage } from '@admin-panel-web/features/auth/pages/login-page/login-page';
import { AuthService } from '@admin-panel-web/features/auth/services/auth.service';
import { AuthSession } from '@admin-panel-web/features/auth/types/auth-session.interface';

import { of, throwError } from 'rxjs';

function createMockAuthService() {
  return {
    isAuthenticated: () => false,
    session: () => null,
    login: vi.fn(),
    logout: vi.fn(),
  };
}

describe('LoginPage', () => {
  let fixture: ComponentFixture<LoginPage>;
  let component: LoginPage;
  let el: HTMLElement;
  let mockAuthService: ReturnType<typeof createMockAuthService>;
  let navigateSpy: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    mockAuthService = createMockAuthService();

    await TestBed.configureTestingModule({
      imports: [LoginPage],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compileComponents();

    const router = TestBed.inject(Router);
    navigateSpy = vi.fn().mockResolvedValue(true);
    router.navigate = navigateSpy as unknown as typeof router.navigate;

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the Figma heading and submit button', () => {
    expect(el.querySelector('h1')?.textContent).toContain('Login to Account');
    expect(el.querySelector('button[type="submit"]')?.textContent).toContain('Sign In');
  });

  it('should not call AuthService.login when form is invalid', () => {
    component['onSubmit']();

    expect(mockAuthService.login).not.toHaveBeenCalled();
  });

  it('should call AuthService.login on submit with valid form', () => {
    const session: AuthSession = { email: 'a@b.com', loggedInAt: '' };
    mockAuthService.login.mockReturnValue(of(session));

    component['form'].setValue({
      email: 'a@b.com',
      password: 'admin123',
      rememberMe: false,
    });
    component['onSubmit']();
    fixture.detectChanges();

    expect(mockAuthService.login).toHaveBeenCalledWith('a@b.com', 'admin123');
    expect(navigateSpy).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should render an alert with error message on failed login', () => {
    mockAuthService.login.mockReturnValue(
      throwError(() => new Error('Incorrect email or password.')),
    );

    component['form'].setValue({
      email: 'a@b.com',
      password: 'wrong-pass',
      rememberMe: false,
    });
    component['onSubmit']();
    fixture.detectChanges();

    const alert = el.querySelector('[role="alert"]');
    expect(alert?.textContent).toContain('Incorrect email or password.');
  });

  it('should toggle password visibility', () => {
    const toggle = el.querySelector('.password-toggle') as HTMLButtonElement;
    const passwordInput = el.querySelector('input[autocomplete="current-password"]') as HTMLInputElement;

    expect(passwordInput.type).toBe('password');

    toggle.click();
    fixture.detectChanges();

    expect(passwordInput.type).toBe('text');
  });
});
