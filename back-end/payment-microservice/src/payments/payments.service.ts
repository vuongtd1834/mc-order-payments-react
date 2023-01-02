import { Injectable } from '@nestjs/common';
import { PayOrderDto } from './dto/pay-order.dto';
import { OrderStatus } from './enums/order-status.enums';

@Injectable()
export class PaymentService {
  processPayment(order: PayOrderDto): OrderStatus {
    if (order.status !== OrderStatus.CREATED) throw 'Wrong order status!';

    if (Math.random() >= 0.5) return OrderStatus.CONFIRMED;

    return OrderStatus.CANCELLED;
  }
}
