import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { take } from 'rxjs';
import { PaymentsService } from '../payments/payments.service';
import { DeleteResult, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrderStatus } from './enums/order-status.enum';

@Injectable()
export class OrderService {
  constructor(
    private readonly paymentsService: PaymentsService,
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>
  ) {}

  checkCancel: boolean;

  /**
   * create an Order
   * @param createOrderDto data transfer object
   * @returns Order after created
   */
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = {
      ...new Order(),
      ...createOrderDto,
      status: OrderStatus.CREATED
    };
    const created = await this.ordersRepository.save(order);
    setTimeout(() => {
      this.processPayments(created);
    }, 5000);
    return created;
  }

  findAll(): Promise<Order[]> {
    return this.ordersRepository.find({ order: { updated_at: 'DESC' } });
  }

  findOne(id: number): Promise<Order> {
    return this.ordersRepository.findOne(id);
  }

  /**
   * Update an Order
   * @param id order id
   * @param updateOrderDto data transfer object
   * @returns an order
   */
  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    await this.ordersRepository.update(id, {
      ...updateOrderDto,
      updated_at: new Date()
    });
    return this.ordersRepository.findOne(id);
  }

  /**
   * Remove an Order
   * @param id order id
   */
  async remove(id: number): Promise<DeleteResult> {
    return await this.ordersRepository.delete(id);
  }

  /**
   * cancel an Order
   * @param id order id
   * @returns an Order or throw error if wrong status
   */
  async cancel(id: number): Promise<Order> {
    const order = await this.ordersRepository.findOne(id);
    this.checkCancel = true;
    switch (order.status) {
      case OrderStatus.CONFIRMED:
      case OrderStatus.CREATED:
        order.status = OrderStatus.CANCELLED;
        await this.ordersRepository.update(id, {
          status: OrderStatus.CANCELLED
        });
        break;
      default:
        throw 'Cannot cancel, wrong status!';
    }
    return this.ordersRepository.findOne(id);
  }

  /**
   * send message to payment service
   * update Order after process payment done
   * @param order Order after created
   * @returns an Order
   */
  async processPayments(order: Order): Promise<void> {
    if (order?.status !== OrderStatus.CREATED)
      throw 'Cannot process payment, wrong status!';

    this.paymentsService
      .processPayments(order)
      .pipe(take(1))
      .subscribe(async (status) => {
        await this.ordersRepository.update(order.id, {
          status
        });
        const orderAfterPayment = await this.ordersRepository.findOne(order.id);
        await this.deliver(orderAfterPayment);
      });
  }

  /**
   * update status order from confirmed to delivered
   * @param order Order after process payment done;
   * @returns Promise or throw error
   */
  async deliver(order: Order): Promise<Order> {
    return new Promise(async (resolve) => {
      const orderRepo = this.ordersRepository;
      const check = this.checkCancel;
      const timer = setTimeout(async () => {
        if (order?.status !== OrderStatus.CONFIRMED) {
          throw 'Cannot deliver, wrong status!';
        }
        await orderRepo.update(order.id, {
          status: OrderStatus.DELIVERED
        });
        resolve(await orderRepo.findOne(order.id));
      }, Math.floor(Math.random() * 3 + 1) * 3000);
      if (check) {
        await this.ordersRepository.update(order.id, {
          status: OrderStatus.CANCELLED
        });
        clearTimeout(timer);
      }
    });
  }
}
