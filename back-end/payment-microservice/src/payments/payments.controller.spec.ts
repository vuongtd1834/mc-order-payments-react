import { Test, TestingModule } from '@nestjs/testing';
import { PayOrderDto } from './dto/pay-order.dto';
import { OrderStatus } from './enums/order-status.enums';
import { PaymentsController } from './payments.controller';
import { PaymentService } from './payments.service';

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let paymentService: PaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [PaymentService],
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
    paymentService = module.get<PaymentService>(PaymentService);
  });

  describe('processOrderPayment', () => {
    it('should call successfully process payment', () => {
      const order: PayOrderDto = {
        id: 1,
        amount: 10,
        username: 'John Doe',
        status: OrderStatus.CREATED,
        created_at: new Date(),
        updated_at: new Date(),
      };
      expect(controller.processOrderPayment(order)).toBeTruthy();
      expect(paymentService.processPayment(order)).toBeTruthy();
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
