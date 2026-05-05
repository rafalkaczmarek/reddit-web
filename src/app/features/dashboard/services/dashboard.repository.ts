import { Injectable } from '@angular/core';

import { DashboardKpi } from '@admin-panel-web/types/dashboard-kpi.interface';
import { DashboardRecentItem } from '@admin-panel-web/types/dashboard-recent-item.interface';

import { Observable, of, delay } from 'rxjs';

const MOCK_KPIS: DashboardKpi[] = [
  {
    id: 'kpi-1',
    title: 'Total Users',
    value: '40,689',
    icon: 'las la-user-friends',
    trend: 'up',
    trendValue: '8.5% Up from yesterday',
    color: 'blue',
  },
  {
    id: 'kpi-2',
    title: 'Total Orders',
    value: '10,293',
    icon: 'las la-shopping-bag',
    trend: 'up',
    trendValue: '1.3% Up from past week',
    color: 'orange',
  },
  {
    id: 'kpi-3',
    title: 'Total Sales',
    value: '$89,000',
    icon: 'las la-chart-bar',
    trend: 'down',
    trendValue: '4.3% Down from yesterday',
    color: 'green',
  },
  {
    id: 'kpi-4',
    title: 'Total Pending',
    value: '2,040',
    icon: 'las la-clock',
    trend: 'up',
    trendValue: '1.8% Up from yesterday',
    color: 'red',
  },
];

const MOCK_RECENT_ITEMS: DashboardRecentItem[] = [
  {
    id: '1',
    productName: 'Apple Watch',
    orderId: '#APL-7281',
    date: '2024-12-12',
    customer: 'John Smith',
    status: 'delivered',
    amount: '$120.00',
  },
  {
    id: '2',
    productName: 'MacBook Pro',
    orderId: '#MBP-3924',
    date: '2024-12-11',
    customer: 'Jane Cooper',
    status: 'processing',
    amount: '$1,799.00',
  },
  {
    id: '3',
    productName: 'iPhone 15',
    orderId: '#IPH-5102',
    date: '2024-12-10',
    customer: 'Robert Fox',
    status: 'pending',
    amount: '$999.00',
  },
  {
    id: '4',
    productName: 'AirPods Pro',
    orderId: '#APD-8837',
    date: '2024-12-09',
    customer: 'Emily Watson',
    status: 'delivered',
    amount: '$249.00',
  },
  {
    id: '5',
    productName: 'iPad Air',
    orderId: '#IPA-6293',
    date: '2024-12-08',
    customer: 'Michael Brown',
    status: 'cancelled',
    amount: '$599.00',
  },
  {
    id: '6',
    productName: 'Apple Pencil',
    orderId: '#APC-1127',
    date: '2024-12-07',
    customer: 'Sarah Davis',
    status: 'delivered',
    amount: '$129.00',
  },
];

@Injectable({ providedIn: 'root' })
export class DashboardRepository {
  public getKpis(): Observable<DashboardKpi[]> {
    return of(MOCK_KPIS).pipe(delay(600));
  }

  public getRecentItems(): Observable<DashboardRecentItem[]> {
    return of(MOCK_RECENT_ITEMS).pipe(delay(800));
  }
}
