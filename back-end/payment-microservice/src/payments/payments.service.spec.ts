import { Test, TestingModule } from '@nestjs/testing';
import { PayOrderDto } from './dto/pay-order.dto';
import { OrderStatus } from './enums/order-status.enums';
import { PaymentService } from './payments.service';

describe('PaymentService', () => {
  let paymentService: PaymentService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [PaymentService],
    }).compile();

    paymentService = app.get<PaymentService>(PaymentService);
    jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789);
  });

  describe('processPayments', () => {
    it('should return order status or throw error', () => {
      const order: PayOrderDto = {
        id: 1,
        amount: 10,
        username: 'John Doe',
        status: OrderStatus.CREATED,
        created_at: new Date(),
        updated_at: new Date(),
      };
      expect(paymentService.processPayment(order)).toBeTruthy();
      const falsyCase = { ...order, status: OrderStatus.CONFIRMED };
      expect(() => paymentService.processPayment(falsyCase)).toThrow(
        'Wrong order status!',
      );
    });
  });

  it('should be defined', () => {
    expect(paymentService).toBeDefined();
  });
});
