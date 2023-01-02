import { Module } from '@nestjs/common';
import { PaymentModule } from 'payments/payments.module';

@Module({
  imports: [PaymentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
