import { Module } from '@nestjs/common';
import { PaymentService } from './payments.service';
import { PaymentsController } from './payments.controller';

@Module({
  providers: [PaymentService],
  controllers: [PaymentsController],
})
export class PaymentModule {}
