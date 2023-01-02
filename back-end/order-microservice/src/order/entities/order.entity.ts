import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entity/base.entity';
import { OrderStatus } from '../enums/order-status.enum';

@Entity('orders')
export class Order extends BaseEntity {
  constructor(amount?: number, username?: string, status?: OrderStatus) {
    super();
    this.amount = amount || 0;
    this.username = username || '';
    this.status = status || OrderStatus.CREATED;
  }
  @Column()
  amount: number;

  @Column()
  username: string;

  @Column({ type: 'int', default: OrderStatus.CREATED })
  status: OrderStatus;
}
