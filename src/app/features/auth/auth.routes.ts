import { Routes } from '@angular/router';

import { LoginPage } from '@admin-panel-web/features/auth/pages/login-page/login-page';
import { guestGuard } from '@admin-panel-web/features/auth/guards/guest.guard';

export const authRoutes: Routes = [
  { path: '', component: LoginPage, canActivate: [guestGuard] },
];
