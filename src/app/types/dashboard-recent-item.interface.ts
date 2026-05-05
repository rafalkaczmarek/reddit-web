export interface DashboardRecentItem {
  readonly id: string;
  readonly productName: string;
  readonly orderId: string;
  readonly date: string;
  readonly customer: string;
  readonly status: 'delivered' | 'pending' | 'cancelled' | 'processing';
  readonly amount: string;
}
