import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrderStatus } from './enums/order-status.enum';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { DeleteResult } from 'typeorm';

describe('OrderController', () => {
  let orderController: OrderController;
  let orderService: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                id: 1,
                amount: 10,
                username: 'John Doe',
                status: OrderStatus.CONFIRMED,
                created_at: new Date('2021-12-19T15:05:46.169Z'),
                updated_at: new Date('2021-12-19T15:05:46.169Z')
              },
              {
                id: 2,
                amount: 100,
                username: 'William',
                status: OrderStatus.DELIVERED,
                created_at: new Date('2021-12-19T15:05:46.169Z'),
                updated_at: new Date('2021-12-19T15:05:46.169Z')
              }
            ]),
            findOne: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                id: +id,
                amount: 10,
                username: 'John Doe',
                status: OrderStatus.CONFIRMED,
                created_at: new Date('2021-12-19T15:05:46.169Z'),
                updated_at: new Date('2021-12-19T15:05:46.169Z')
              })
            ),
            create: jest
              .fn()
              .mockImplementation((createOrderDto: CreateOrderDto) =>
                Promise.resolve({
                  id: 1,
                  amount: 10,
                  created_at: new Date('2021-12-19T15:05:46.169Z'),
                  updated_at: new Date('2021-12-19T15:05:46.169Z'),
                  ...createOrderDto
                })
              ),
            update: jest
              .fn()
              .mockImplementation(
                (id: string, updateOrderDto: UpdateOrderDto) =>
                  Promise.resolve({
                    id: +id,
                    amount: 10,
                    created_at: new Date('2021-12-19T15:05:46.169Z'),
                    updated_at: new Date('2021-12-19T15:05:46.169Z'),
                    ...updateOrderDto
                  })
              ),
            remove: jest.fn().mockResolvedValue(DeleteResult),
            cancel: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                id: +id,
                amount: 10,
                created_at: new Date('2021-12-19T15:05:46.169Z'),
                updated_at: new Date('2021-12-19T15:05:46.169Z'),
                status: OrderStatus.CANCELLED,
                username: 'John Doe'
              })
            )
          }
        }
      ]
    }).compile();

    orderController = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderService);
  });

  describe('findAll', () => {
    it('should return an array of orders', async () => {
      const results: Order[] = [
        {
          id: 1,
          amount: 10,
          username: 'John Doe',
          status: OrderStatus.CONFIRMED,
          created_at: new Date('2021-12-19T15:05:46.169Z'),
          updated_at: new Date('2021-12-19T15:05:46.169Z')
        },
        {
          id: 2,
          amount: 100,
          username: 'William',
          status: OrderStatus.DELIVERED,
          created_at: new Date('2021-12-19T15:05:46.169Z'),
          updated_at: new Date('2021-12-19T15:05:46.169Z')
        }
      ];
      await expect(orderController.findAll()).resolves.toEqual(results);
    });
  });

  describe('findOne', () => {
    it('should return an order', async () => {
      const order: Order = {
        id: 1,
        amount: 10,
        username: 'John Doe',
        status: OrderStatus.CONFIRMED,
        created_at: new Date(),
        updated_at: new Date()
      };
      jest
        .spyOn(orderService, 'findOne')
        .mockImplementation(() => new Promise((resolve) => resolve(order)));
      expect(await orderController.findOne(1)).toBe(order);
    });
  });

  describe('create', () => {
    it('should return an order', async () => {
      const createDto: CreateOrderDto = {
        amount: 10,
        username: 'John Doe'
      };
      await expect(orderController.create(createDto)).resolves.toEqual({
        id: 1,
        amount: 10,
        created_at: new Date('2021-12-19T15:05:46.169Z'),
        updated_at: new Date('2021-12-19T15:05:46.169Z'),
        ...createDto
      });
    });
  });

  describe('update', () => {
    it('should return an order', async () => {
      const updateDto: UpdateOrderDto = {
        amount: 10,
        username: 'John Doe'
      };
      await expect(orderController.update(1, updateDto)).resolves.toEqual({
        id: 1,
        amount: 10,
        created_at: new Date('2021-12-19T15:05:46.169Z'),
        updated_at: new Date('2021-12-19T15:05:46.169Z'),
        ...updateDto
      });
    });
  });

  describe('remove', () => {
    it('should call remove method with expected param', async () => {
      const orderId = 1;
      await expect(orderController.remove(orderId)).resolves.toEqual(
        DeleteResult
      );
    });
  });

  describe('cancel', () => {
    it('should return an order', async () => {
      const order: Order = {
        id: 1,
        amount: 10,
        username: 'John Doe',
        status: OrderStatus.CANCELLED,
        created_at: new Date('2021-12-19T15:05:46.169Z'),
        updated_at: new Date('2021-12-19T15:05:46.169Z')
      };
      await expect(orderController.cancel(1)).resolves.toEqual(order);
    });
  });
});
