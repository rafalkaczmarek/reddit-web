import { Routes } from '@angular/router';

import { DashboardPage } from '@admin-panel-web/dashboard/components/dashboard-page/dashboard-page';
import { ProductsPage } from '@admin-panel-web/products/components/products-page/products-page';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DashboardPage },
  { path: 'products', component: ProductsPage },
  { path: '**', redirectTo: 'dashboard' },
];
