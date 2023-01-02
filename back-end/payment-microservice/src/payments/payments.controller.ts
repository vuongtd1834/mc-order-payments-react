import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PayOrderDto } from './dto/pay-order.dto';
import { OrderStatus } from './enums/order-status.enums';
import { PaymentService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentService) {}

  @MessagePattern({ type: 'process-order-payment' })
  public async processOrderPayment(order: PayOrderDto): Promise<OrderStatus> {
    return this.paymentsService.processPayment(order);
  }
}
