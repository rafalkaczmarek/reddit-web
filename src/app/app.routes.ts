import { Routes } from '@angular/router';

import { DashboardPage } from './components/dashboard-page/dashboard-page';
import { MenuPage } from './components/menu-page/menu-page';
import { ProductsPage } from './components/products-page/products-page';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DashboardPage },
  { path: 'products', component: ProductsPage },
  { path: ':page', component: MenuPage },
  { path: '**', redirectTo: 'dashboard' },
];
