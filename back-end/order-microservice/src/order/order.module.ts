import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './entities/order.entity';
import { PaymentsService } from '../payments/payments.service';
import { redisConfig } from '../config/redis/redis.config';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [
    {
      provide: 'PAYMENT_SERVICE',
      useFactory: redisConfig,
      inject: [ConfigService]
    },
    OrderService,
    PaymentsService
  ]
})
export class OrderModule {}
