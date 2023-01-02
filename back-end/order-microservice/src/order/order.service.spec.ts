import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { PaymentsService } from '../payments/payments.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrderStatus } from './enums/order-status.enum';
import { OrderService } from './order.service';

const orderArrays: Order[] = [
  new Order(10, 'John Doe', OrderStatus.CONFIRMED),
  new Order(100, 'Selena William', OrderStatus.DELIVERED),
  new Order(200, 'Logan Gracie', OrderStatus.CANCELLED)
];

const oneOrder = new Order(20, 'Lionel Messi', OrderStatus.CREATED);

describe('OrderService', () => {
  let service: OrderService;
  let orderRepository: Repository<Order>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(Order),
          useValue: {
            find: jest.fn().mockResolvedValue(orderArrays),
            findOne: jest.fn().mockRejectedValue(oneOrder),
            save: jest.fn(),
            update: jest.fn().mockResolvedValue(true),
            delete: jest.fn().mockResolvedValue(true)
          }
        },
        {
          provide: PaymentsService,
          useValue: {
            processPayments: jest.fn()
          }
        }
      ]
    }).compile();

    service = module.get<OrderService>(OrderService);
    orderRepository = module.get<Repository<Order>>(getRepositoryToken(Order));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of orders', async () => {
      const orders = await service.findAll();
      expect(orders).toEqual(orderArrays);
    });
  });

  describe('findOne', () => {
    it('should return a single order', async () => {
      const repoSpy = jest.spyOn(orderRepository, 'findOne');
      expect(service.findOne(1)).resolves.toEqual(oneOrder);
      expect(repoSpy).toBeCalledWith(1);
    });
  });

  describe('create', () => {
    it('should successfully insert a order', async () => {
      const createOrderDto: CreateOrderDto = {
        amount: 20,
        username: 'Lionel Messi'
      };
      expect(service.create(createOrderDto)).resolves.toEqual(oneOrder);
      expect(orderRepository.save).toHaveBeenCalledTimes(1);
      expect(orderRepository.save).toBeCalledWith(oneOrder);
      expect(orderRepository.save).toBeCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should successfully update a order', async () => {
      const updateOrderDto: UpdateOrderDto = {
        amount: 30,
        username: 'Cristiano Ronaldo'
      };
      expect(service.update(1, updateOrderDto)).resolves.toEqual({
        ...oneOrder,
        ...updateOrderDto
      });
      expect(orderRepository.update).toBeCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should return DeleteResult', async () => {
      expect(service.remove(1)).resolves.toEqual(DeleteResult);
      expect(orderRepository.delete).toBeCalledTimes(1);
      expect(orderRepository.delete).toBeCalledWith(1);
    });
  });

  describe('cancel', () => {
    it('should return a single order with status is cancelled', async () => {
      expect(service.cancel(1)).resolves.toEqual({
        ...oneOrder,
        status: OrderStatus.CANCELLED
      });
      expect(orderRepository.findOne).toBeCalledWith(1);
    });
  });

  describe('processPayments', () => {
    it('should call successfully process payments from payment service', async () => {
      expect(service.processPayments(oneOrder)).toBeTruthy();
    });
  });

  describe('deliver', () => {
    it('should return an order ', async () => {
      expect(
        service.deliver({ ...oneOrder, status: OrderStatus.CONFIRMED })
      ).resolves.toEqual({ ...oneOrder, status: OrderStatus.DELIVERED });
    });
  });
});
