export interface ProductStock {
  readonly id: string;
  readonly image: string;
  readonly name: string;
  readonly category: string;
  readonly price: number;
  readonly piece: number;
  readonly availableColors: string[];
  readonly status: 'in-stock' | 'out-of-stock';
}
