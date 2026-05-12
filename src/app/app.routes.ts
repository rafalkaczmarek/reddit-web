import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('@admin-panel-web/features/dashboard/dashboard.routes').then((m) => m.dashboardRoutes),
  },
  {
    path: 'products-stock',
    loadChildren: () =>
      import('@admin-panel-web/features/products-stock/products-stock.routes').then(
        (m) => m.productsStockRoutes,
      ),
  },
  { path: '**', redirectTo: 'dashboard' },
];
