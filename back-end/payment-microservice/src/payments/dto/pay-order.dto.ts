import { OrderStatus } from '../enums/order-status.enums';

export class PayOrderDto {
  id: number;
  status: OrderStatus;
  amount: number;
  username: string;
  created_at: Date;
  updated_at: Date;
}
