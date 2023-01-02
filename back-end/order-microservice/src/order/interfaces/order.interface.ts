import { OrderStatus } from '../enums/order-status.enum';

export interface IOder {
  id: number;
  amount: number;
  status: OrderStatus;
  username: string;
  created_at: Date;
  updated_at: Date;
}
