import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { OrderStatus } from '../order/enums/order-status.enum';
import { Order } from '../order/entities/order.entity';

@Injectable()
export class PaymentsService {
  constructor(@Inject('PAYMENT_SERVICE') private client: ClientProxy) {}

  public processPayments(order: Order): Observable<OrderStatus> {
    return this.client.send<OrderStatus>(
      { type: 'process-order-payment' },
      order
    );
  }
}
