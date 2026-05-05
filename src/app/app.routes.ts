import { Routes } from '@angular/router';

import { ProductsPage } from '@admin-panel-web/products/components/products-page/products-page';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('@admin-panel-web/features/dashboard/dashboard.routes').then((m) => m.dashboardRoutes),
  },
  { path: 'products', component: ProductsPage },
  { path: '**', redirectTo: 'dashboard' },
];
